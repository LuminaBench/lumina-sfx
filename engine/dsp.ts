import type { RenderContext } from './types.ts';

export const TAU = Math.PI * 2;
export const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
export const dbToGain = (db: number) => 10 ** (db / 20);
export const gainToDb = (gain: number) => 20 * Math.log10(Math.max(gain, 1e-9));

export function rng(seed: number): () => number {
  let value = seed >>> 0;
  return () => {
    value = (value + 0x6d2b79f5) | 0;
    let hash = Math.imul(value ^ (value >>> 15), value | 1);
    hash ^= hash + Math.imul(hash ^ (hash >>> 7), hash | 61);
    return ((hash ^ (hash >>> 14)) >>> 0) / 4294967296;
  };
}

export function envelope(time: number, attack: number, decay: number): number {
  return Math.min(1, Math.max(0, time / attack)) * Math.exp(-Math.max(0, time - attack) / decay);
}

export function sweep(from: number, to: number, decay: number, time: number): number {
  return to + (from - to) * Math.exp(-time / decay);
}

export function renderSamples(ctx: RenderContext, getSample: (t: number, i: number) => number): Float32Array {
  const signal = new Float32Array(ctx.frames);
  for (let i = 0; i < signal.length; i++) signal[i] = getSample(i / ctx.sampleRate, i);
  return signal;
}

export function mix(dst: Float32Array, src: Float32Array, gain = 1, offset = 0): void {
  const start = Math.max(0, -offset);
  const end = Math.min(src.length, dst.length - offset);
  for (let i = start; i < end; i++) dst[i + offset] += src[i] * gain;
}

export function layer(ctx: RenderContext, dst: Float32Array, at: number, duration: number,
  factory: (shot: RenderContext) => Float32Array, gain = 1): void {
  const offset = Math.round(at * ctx.sampleRate);
  const frames = Math.min(Math.round(duration * ctx.sampleRate), dst.length - offset);
  if (frames > 0) mix(dst, factory({ ...ctx, frames }), gain, offset);
}

export type FilterKind = 'lowpass' | 'highpass' | 'bandpass';

export function biquad(kind: FilterKind, frequency: number, q: number, sampleRate: number): (x: number) => number {
  const w = TAU * clamp(frequency, 1, sampleRate * 0.48) / sampleRate;
  const cos = Math.cos(w);
  const alpha = Math.sin(w) / (2 * q);
  const a0 = 1 + alpha;
  const a1 = -2 * cos / a0;
  const a2 = (1 - alpha) / a0;
  const b0 = (kind === 'lowpass' ? (1 - cos) / 2 : kind === 'highpass' ? (1 + cos) / 2 : alpha) / a0;
  const b1 = kind === 'lowpass' ? b0 * 2 : kind === 'highpass' ? -b0 * 2 : 0;
  const b2 = kind === 'bandpass' ? -b0 : b0;
  let z1 = 0;
  let z2 = 0;
  return (x) => {
    const y = x * b0 + z1;
    z1 = x * b1 + z2 - a1 * y;
    z2 = x * b2 - a2 * y;
    return y;
  };
}

export type NoiseColor = 'white' | 'pink' | 'brown';

export function noise(random: () => number, color: NoiseColor): () => number {
  if (color === 'white') return () => random() * 2 - 1;
  if (color === 'brown') {
    let sum = 0;
    return () => {
      sum = 0.987 * sum + 0.087 * (random() * 2 - 1);
      return sum;
    };
  }
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  return () => {
    const white = random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    const pink = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.14;
    b6 = white * 0.115926;
    return pink;
  };
}

export interface NoiseLayer {
  color: NoiseColor;
  kind: FilterKind;
  hz: number;
  q?: number;
  gain: number;
  attack: number;
  decay: number;
}

export function punch(ctx: RenderContext, bands: readonly NoiseLayer[]): Float32Array {
  const dst = new Float32Array(ctx.frames);
  for (const { color, kind, hz, q = 0.707, gain, attack, decay } of bands) {
    const source = noise(ctx.random, color);
    const filter = biquad(kind, hz, q, ctx.sampleRate);
    mix(dst, renderSamples(ctx, (t) => filter(source()) * envelope(t, attack, decay)), gain);
  }
  return dst;
}

export function tone(ctx: RenderContext, pitch: (t: number) => number,
  level: (t: number) => number, shape: (phase: number, t: number) => number = Math.sin): Float32Array {
  let phase = 0;
  return renderSamples(ctx, (t) => {
    phase += TAU * clamp(pitch(t), 0, ctx.sampleRate * 0.45) / ctx.sampleRate;
    return shape(phase, t) * level(t);
  });
}

export type Material = 'metal' | 'wood' | 'flesh';
type Mode = readonly [ratio: number, gain: number, decayRatio: number];
const materials: Record<Material, readonly Mode[]> = {
  metal: [[1, 1, 1], [1.49, 0.45, 0.87], [2.14, 0.34, 0.70], [2.93, 0.23, 0.57], [4.25, 0.20, 0.37], [5.73, 0.14, 0.24]],
  wood: [[1, 1, 1], [1.71, 0.43, 0.62], [2.88, 0.24, 0.42], [4.13, 0.09, 0.23], [6.16, 0.05, 0.18]],
  flesh: [[1, 1, 1], [1.41, 0.18, 0.61], [2.22, 0.09, 0.45], [3.91, 0.05, 0.31]],
};

export function modal(ctx: RenderContext, material: Material, hz: number, decay: number): Float32Array {
  const dst = new Float32Array(ctx.frames);
  for (const [ratio, gain, damping] of materials[material]) {
    const frequency = hz * ratio * (0.992 + ctx.random() * 0.016);
    if (frequency > ctx.sampleRate * 0.46) continue;
    mix(dst, tone(ctx, () => frequency, (t) => envelope(t, 0.0012, decay * damping)), gain);
  }
  return dst;
}

export interface Formant {
  hz: number;
  bandwidth: number;
  gain: number;
}

export function formants(source: Float32Array, sampleRate: number, bands: readonly Formant[]): Float32Array {
  const dst = new Float32Array(source.length);
  for (const { hz, bandwidth, gain } of bands) {
    const filter = biquad('bandpass', hz, hz / bandwidth, sampleRate);
    for (let i = 0; i < source.length; i++) dst[i] += gain * filter(source[i]);
  }
  return dst;
}

export function waveshape(sample: number, drive = 2): number {
  return Math.tanh(sample * drive) / Math.tanh(drive);
}

export function reverb(buffer: Float32Array, sampleRate: number, space: 'room' | 'outdoor', wet: number): Float32Array {
  const out = buffer.slice();
  const scale = (ms: number) => Math.max(1, Math.round(ms * sampleRate / 1000));
  const reflections = space === 'room'
    ? [[11, 0.36], [19, 0.28], [31, -0.21], [43, 0.18]]
    : [[41, 0.24], [97, 0.17], [173, -0.10], [241, 0.08]];
  const delays = (space === 'room' ? [37, 49, 61, 73] : [79, 113, 157, 197]).map(scale);
  for (const [ms, gain] of reflections) mix(out, buffer, gain * wet, scale(ms));
  for (const delay of delays) {
    const feedback = space === 'room' ? 0.62 : 0.43;
    const ring = new Float32Array(delay);
    const damp = biquad('lowpass', space === 'room' ? 3800 : 2300, 0.707, sampleRate);
    for (let i = 0; i < buffer.length; i++) {
      const index = i % delay;
      const echo = damp(ring[index]);
      ring[index] = buffer[i] + echo * feedback;
      out[i] += wet * 0.19 * echo;
    }
  }
  return out;
}

// The extra samples are the natural continuation of the end. Blend them into the head.
export function closeLoop(input: Float32Array, frames: number, overlap: number): Float32Array {
  if (overlap < 2 || overlap > frames || input.length < frames + overlap) {
    throw new RangeError('Loop crossfade needs enough continuation samples');
  }
  const output = input.slice(0, frames);
  for (let i = 0; i < overlap; i++) {
    const weight = (1 - Math.cos(Math.PI * i / (overlap - 1))) * 0.5;
    output[i] = input[frames + i] * (1 - weight) + input[i] * weight;
  }
  return output;
}
