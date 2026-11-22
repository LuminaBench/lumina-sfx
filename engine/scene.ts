import { SfxPlayer } from './player.ts';
import type { SoundRecipe } from './types.ts';

export interface SceneCue {
  id: string;
  event?: string; // Omit for a persistent loop.
  gain?: number;
  blend?: { control: string; side: 'in' | 'out' };
  lowpass?: { control: string; openHz: number; closedHz: number };
  rate?: { control: string; min: number; max: number };
}
export interface GameAudioScene {
  controls: Readonly<Record<string, number>>;
  cues: readonly SceneCue[];
}

function finiteRange(value: number, low: number, high: number) {
  return Number.isFinite(value) && value >= low && value <= high;
}

export function validateScene(scene: GameAudioScene, recipes: ReadonlyMap<string, SoundRecipe>): void {
  if (
    !scene.controls ||
    typeof scene.controls !== 'object' ||
    Array.isArray(scene.controls) ||
    !Array.isArray(scene.cues) ||
    !scene.cues.length
  )
    throw Error('Expected scene controls and cues');
  if (!Object.values(scene.controls).every((v) => finiteRange(v, 0, 1)))
    throw Error('Invalid initial scene control');
  for (const cue of scene.cues) {
    const recipe = recipes.get(cue.id);
    if (!recipe || (!cue.event && !recipe.loopable)) throw Error('Missing recipe or invalid bed: ' + cue.id);
    if (!finiteRange(cue.gain ?? 1, 0, 2)) throw Error('Invalid scene gain');
    if (
      cue.blend &&
      (!Object.hasOwn(scene.controls, cue.blend.control) || !['in', 'out'].includes(cue.blend.side))
    )
      throw Error('Invalid blend for ' + cue.id);
    if (cue.event !== undefined && (typeof cue.event !== 'string' || !cue.event.trim()))
      throw Error('Invalid scene event');
    if (
      cue.lowpass &&
      (!Object.hasOwn(scene.controls, cue.lowpass.control) ||
        !finiteRange(cue.lowpass.closedHz, 40, 20000) ||
        !finiteRange(cue.lowpass.openHz, cue.lowpass.closedHz, 24000))
    )
      throw Error('Invalid scene lowpass');
    if (
      cue.rate &&
      (cue.event ||
        !Object.hasOwn(scene.controls, cue.rate.control) ||
        !finiteRange(cue.rate.min, 0.25, 4) ||
        !finiteRange(cue.rate.max, cue.rate.min, 4))
    )
      throw Error('Invalid loop rate');
  }
}

/** Update normalized game controls every frame. Emit one-shots only on real game events. */
export class SfxScene {
  private readonly context: BaseAudioContext;
  private readonly controls: Record<string, number>;
  private readonly tracks: {
    cue: SceneCue;
    player: SfxPlayer;
    bus: GainNode;
    filter?: BiquadFilterNode;
    loop?: AudioBufferSourceNode;
  }[];
  private running = false;
  private disposed = false;

  constructor(
    context: BaseAudioContext,
    scene: GameAudioScene,
    recipes: ReadonlyMap<string, SoundRecipe>,
    output = context.destination as AudioNode,
  ) {
    this.context = context;
    this.controls = { ...scene.controls };
    validateScene(scene, recipes);
    this.tracks = scene.cues.map((cue) => {
      const bus = context.createGain();
      const filter = cue.lowpass ? context.createBiquadFilter() : undefined;
      if (filter) {
        filter.type = 'lowpass';
        filter.Q.value = 0.707;
        bus.connect(filter).connect(output);
      } else bus.connect(output);
      const player = new SfxPlayer(context, recipes.get(cue.id)!, {
        output: bus,
        intensity: 1,
        level: 'balanced',
        variants: cue.event ? 4 : 1,
      });
      return { cue, player, bus, filter };
    });
    this.apply(false);
  }

  start(): void {
    if (this.disposed) throw Error('Scene has been disposed');
    if (this.running) return;
    for (const track of this.tracks) track.player.prime();
    for (const track of this.tracks) if (!track.cue.event) track.loop = track.player.play({ vary: false });
    this.running = true;
    this.apply(false);
  }

  set(control: string, value: number): void {
    if (!Object.hasOwn(this.controls, control) || !finiteRange(value, 0, 1))
      throw Error('Invalid scene control: ' + control);
    if (this.controls[control] === value) return;
    this.controls[control] = value;
    this.apply(true);
  }

  trigger(event: string): void {
    if (!this.running) throw Error('Start the scene before triggering events');
    const tracks = this.tracks.filter((t) => t.cue.event === event);
    if (!tracks.length) throw Error('Unknown scene event: ' + event);
    for (const t of tracks) t.player.play({ loop: false });
  }

  stop(): void {
    for (const track of this.tracks) {
      track.player.stopAll();
      track.loop = undefined;
    }
    this.running = false;
  }

  dispose(): void {
    this.stop();
    for (const { bus, filter } of this.tracks) {
      bus.disconnect();
      filter?.disconnect();
    }
    this.disposed = true;
  }

  private apply(smooth: boolean): void {
    const now = this.context.currentTime;
    for (const { cue, bus, loop, filter } of this.tracks) {
      let gain = cue.gain ?? 1;
      if (cue.blend) {
        const angle = (Math.PI * this.controls[cue.blend.control]) / 2;
        gain *= cue.blend.side === 'in' ? Math.sin(angle) : Math.cos(angle);
      }
      if (smooth) bus.gain.setTargetAtTime(gain, now, 0.035);
      else bus.gain.setValueAtTime(gain, now);
      if (filter && cue.lowpass) {
        const { control, openHz, closedHz } = cue.lowpass;
        const hz = Math.min(
          this.context.sampleRate * 0.45,
          openHz * (closedHz / openHz) ** this.controls[control],
        );
        if (smooth) filter.frequency.setTargetAtTime(hz, now, 0.035);
        else filter.frequency.setValueAtTime(hz, now);
      }
      if (cue.rate && loop) {
        const speed = cue.rate.min + this.controls[cue.rate.control] * (cue.rate.max - cue.rate.min);
        if (smooth) loop.playbackRate.setTargetAtTime(speed, now, 0.045);
        else loop.playbackRate.setValueAtTime(speed, now);
      }
    }
  }
}
