import { clamp, rng } from './dsp.ts';
import { DEFAULT_SEED, renderChannels, SAMPLE_RATE } from './render.ts';
import type { LevelProfile, SoundRecipe } from './types.ts';

interface Voice {
  source: AudioBufferSourceNode;
  filter: BiquadFilterNode;
  gain: GainNode;
  brightness: number;
  level: number;
  stopping: boolean;
}

interface PlayerOptions {
  output?: AudioNode;
  variants?: number;
  params?: Readonly<Record<string, number>>;
  intensity?: number;
  rpm?: number;
  level?: LevelProfile;
}

interface PlayOptions {
  vary?: boolean;
  loop?: boolean;
  gain?: number;
}

export class SfxPlayer {
  private readonly random = rng(DEFAULT_SEED ^ 0xa341316c);
  private readonly variants: (AudioBuffer | undefined)[];
  private readonly voices = new Set<Voice>();
  private readonly context: AudioContext;
  private readonly recipe: SoundRecipe;
  private readonly output: AudioNode;
  private readonly params: PlayerOptions['params'];
  private readonly level: LevelProfile;
  private round = 0;
  private intensity: number;
  private rpm: number;
  private timer?: ReturnType<typeof setTimeout>;
  private repeating = false;
  private lastShotTime?: number;

  constructor(context: AudioContext, recipe: SoundRecipe, options: PlayerOptions = {}) {
    this.context = context;
    this.recipe = recipe;
    this.output = options.output ?? context.destination;
    this.variants = Array.from({ length: Math.round(clamp(options.variants ?? 4, 1, 16)) });
    this.params = options.params;
    this.level = options.level ?? 'original';
    this.intensity = clamp(options.intensity ?? 0.8, 0, 1);
    this.rpm = clamp(options.rpm ?? 360, 30, 1800);
  }

  prime(): void {
    for (let i = 0; i < this.variants.length; i++) this.buffer(i);
  }

  setIntensity(value: number): void {
    if (!Number.isFinite(value)) return;
    this.intensity = clamp(value, 0, 1);
    for (const voice of this.voices) if (!voice.stopping) this.updateVoice(voice, 0.04);
  }

  setRpm(value: number): void {
    if (!Number.isFinite(value)) return;
    this.rpm = clamp(value, 30, 1800);
    if (this.repeating) this.scheduleNext();
  }

  play(options: PlayOptions = {}): AudioBufferSourceNode {
    const varied = options.vary ?? true;
    const slot = varied ? this.round++ % this.variants.length : 0;
    const buffer = this.buffer(slot);
    const now = this.context.currentTime;
    const source = this.context.createBufferSource();
    const filter = this.context.createBiquadFilter();
    const gain = this.context.createGain();
    const voice: Voice = {
      source, filter, gain, brightness: varied ? 0.88 + this.random() * 0.24 : 1,
      level: clamp(options.gain ?? 1, 0, 2), stopping: false,
    };
    const active = Array.from(this.voices).filter((item) => !item.stopping && !item.source.loop);
    if (active.length >= 12) this.release(active[0]);
    source.buffer = buffer;
    source.loop = this.recipe.loopable && (options.loop ?? true);
    source.playbackRate.value = varied ? 2 ** ((this.random() * 1.3 - 0.65) / 12) : 1;
    filter.type = 'lowpass';
    filter.Q.value = 0.1;
    this.updateVoice(voice, 0);
    source.connect(filter).connect(gain).connect(this.output);
    this.voices.add(voice);
    source.onended = () => {
      this.voices.delete(voice);
      source.disconnect();
      filter.disconnect();
      gain.disconnect();
    };
    source.start(now);
    return source;
  }

  startRepeating(): void {
    if (this.repeating) return;
    this.prime();
    this.repeating = true;
    this.tick();
  }

  stopRepeating(): void {
    clearTimeout(this.timer);
    this.repeating = false;
  }

  stopAll(): void {
    this.stopRepeating();
    for (const voice of this.voices) this.release(voice);
  }

  private buffer(slot: number): AudioBuffer {
    let result = this.variants[slot];
    if (result) return result;
    const channels = renderChannels(this.recipe, { seed: DEFAULT_SEED + slot * 8191, params: this.params, level: this.level });
    result = this.context.createBuffer(channels.length, channels[0].length, SAMPLE_RATE);
    for (const [side, samples] of channels.entries()) result.getChannelData(side).set(samples);
    this.variants[slot] = result;
    return result;
  }

  private updateVoice(voice: Voice, smooth: number): void {
    const now = this.context.currentTime;
    const frequency = Math.min(this.context.sampleRate * 0.49, (1700 + 18200 * this.intensity ** 1.4) * voice.brightness);
    const volume = this.intensity ** 0.75 * voice.level;
    if (smooth) {
      voice.filter.frequency.setTargetAtTime(frequency, now, smooth);
      voice.gain.gain.setTargetAtTime(volume, now, smooth);
    } else {
      voice.filter.frequency.setValueAtTime(frequency, now);
      voice.gain.gain.setValueAtTime(volume, now);
    }
  }

  private release(voice: Voice): void {
    if (voice.stopping) return;
    voice.stopping = true;
    const now = this.context.currentTime;
    voice.gain.gain.cancelScheduledValues(now);
    voice.gain.gain.setTargetAtTime(0, now, 0.008);
    voice.source.stop(now + 0.044);
  }

  private tick(): void {
    if (!this.repeating) return;
    this.lastShotTime = performance.now();
    this.play({ loop: false });
    this.scheduleNext();
  }

  private scheduleNext(): void {
    clearTimeout(this.timer);
    const now = performance.now();
    const due = (this.lastShotTime ?? now) + 60_000 / this.rpm;
    this.timer = setTimeout(() => this.tick(), Math.max(0, due - now));
  }
}
