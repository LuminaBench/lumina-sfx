import { biquad } from './dsp.ts';
import type { RecordingCredit, RenderContext } from './types.ts';

export interface RecordedClip {
  readonly credit: RecordingCredit;
  readonly sampleRate: number;
  readonly takes: readonly string[];
}

interface RecordingOptions {
  seed?: number;
  speed?: number;
  cutoffHz?: number;
  startSec?: number;
}

const decoded = new WeakMap<RecordedClip, Map<number, Float32Array>>();

function decode(clip: RecordedClip, take: number): Float32Array {
  const cache = decoded.get(clip) ?? new Map();
  decoded.set(clip, cache);
  const existing = cache.get(take);
  if (existing) return existing;
  const data = atob(clip.takes[take]);
  const samples = new Float32Array(data.length / 2);
  for (let i = 0; i < samples.length; i++) {
    const value = data.charCodeAt(i * 2) | (data.charCodeAt(i * 2 + 1) << 8);
    samples[i] = (value << 16 >> 16) / 32768;
  }
  cache.set(take, samples);
  return samples;
}

export function renderRecording(ctx: RenderContext, clip: RecordedClip, options: RecordingOptions = {}): Float32Array {
  const speed = options.speed ?? 1;
  const take = ((options.seed ?? 0) >>> 0) % clip.takes.length;
  const input = decode(clip, take);
  const stride = clip.sampleRate * speed / ctx.sampleRate;
  const start = (options.startSec ?? 0) * clip.sampleRate;
  const cutoff = ctx.sampleRate * 0.43 / speed;
  const source = stride > 1 && cutoff < clip.sampleRate * 0.43
    ? input.map(biquad('lowpass', cutoff, 0.71, clip.sampleRate)).map(biquad('lowpass', cutoff, 0.71, clip.sampleRate))
    : input;
  const color = options.cutoffHz === undefined ? (sample: number) => sample : biquad('lowpass', options.cutoffHz, 0.71, ctx.sampleRate);
  const out = new Float32Array(ctx.frames);
  for (let i = 0; i < out.length; i++) {
    const at = start + i * stride;
    const index = Math.floor(at);
    const a = source[index] ?? 0;
    const b = source[index + 1] ?? 0;
    out[i] = color(a + (b - a) * (at - index));
  }
  return out;
}
