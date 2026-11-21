import { clamp } from './dsp.ts';
import { SfxPlayer } from './player.ts';
import type { SoundRecipe } from './types.ts';

// Keep both loop transports running. Moving a weather control never resets rain
// strokes or thunder tails to the beginning of a buffer.
export class SfxBedBlend {
  private readonly context: AudioContext;
  private readonly gains: readonly [GainNode, GainNode];
  private readonly players: readonly [SfxPlayer, SfxPlayer];
  private running = false;

  constructor(context: AudioContext, light: SoundRecipe, heavy: SoundRecipe, output: AudioNode = context.destination) {
    if (!light.loopable || !heavy.loopable) throw new Error('A bed blend requires two loopable recipes');
    this.context = context;
    this.gains = [context.createGain(), context.createGain()];
    this.gains[0].gain.value = 1;
    this.gains[1].gain.value = 0;
    this.gains.forEach(node => node.connect(output));
    const settings = { variants: 1, intensity: 1, level: 'balanced' as const };
    this.players = [
      new SfxPlayer(context, light, { ...settings, output: this.gains[0] }),
      new SfxPlayer(context, heavy, { ...settings, output: this.gains[1] }),
    ];
  }
  play(): void {
    if (this.running) return;
    this.players.forEach(player => player.prime());
    this.players.forEach(player => player.play({ vary: false }));
    this.running = true;
  }
  setIntensity(value: number): void {
    if (!Number.isFinite(value)) return;
    const position = clamp(value, 0, 1) * Math.PI / 2;
    [Math.cos(position), Math.sin(position)].forEach((gain, i) => {
      this.gains[i].gain.setTargetAtTime(gain, this.context.currentTime, 0.045);
    });
  }
  stop(): void {
    this.players.forEach(player => player.stopAll());
    this.running = false;
  }
}
