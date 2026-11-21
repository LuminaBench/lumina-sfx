import { biquad, envelope, mix, noise, renderSamples } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';

interface Pressure {
  span: number;
  low: number;
  high: number;
  edge: number;
  weight: number;
}

// Uneven positive and negative lobes give the short pressure front its shape.
export function pressure(ctx: RenderContext, { span, low, high, edge, weight }: Pressure): Float32Array {
  const white = noise(ctx.random, 'white');
  const pink = noise(ctx.random, 'pink');
  const crack = biquad('highpass', high, 0.66, ctx.sampleRate);
  const vent = biquad('bandpass', low, 0.69, ctx.sampleRate);
  const air = biquad('lowpass', high * 1.4, 0.72, ctx.sampleRate);
  const bite = biquad('bandpass', Math.sqrt(low * high), 0.89, ctx.sampleRate);
  const pressureFloor = biquad('highpass', Math.max(35, low * 0.28), 0.71, ctx.sampleRate);
  const variation = 0.86 + 0.27 * ctx.random();
  const front = span * variation;
  return renderSamples(ctx, (t) => {
    const start = Math.min(1, t * 17000);
    const x = t / front;
    const positive = Math.exp(-x * 2.4);
    const wake = x * Math.exp(-x * 1.42);
    const grit = white();
    return pressureFloor(start * (edge * (positive - 1.25 * wake) +
      (edge * 1.19 + weight * 0.38) * bite(grit) * envelope(t, 0.00014, front * 1.06) +
      edge * 0.48 * crack(grit) * envelope(t, 0.00012, front * 0.98) +
      weight * 1.05 * vent(pink()) * envelope(t, front * 0.19, front * 2.9) +
      weight * 0.49 * air(grit) * envelope(t, front * 0.15, front * 1.58)));
  });
}

export function scatter(ctx: RenderContext, dst: Float32Array, direct: Float32Array,
  span: number, presence: number, brightness: number): void {
  const color = (cutoff: number) => {
    const filter = biquad('lowpass', cutoff, 0.71, ctx.sampleRate);
    return direct.map(filter);
  };
  const near = color(brightness);
  const far = color(brightness * 0.43);
  const distant = color(brightness * 0.19);
  const at = (time: number) => Math.round(time * ctx.sampleRate);
  mix(dst, near, 0.34 * presence, at(0.003 + ctx.random() * 0.005));
  mix(dst, near, -0.23 * presence, at(0.010 + ctx.random() * 0.008));
  mix(dst, far, 0.17 * presence, at(0.020 + ctx.random() * 0.021));
  const onset = 0.018;
  const clusters = 56;
  for (let i = 0; i < clusters; i++) {
    const phase = (i + ctx.random()) / clusters;
    const delay = onset + span * phase ** 1.53;
    const gain = presence * (0.06 + 0.16 * ctx.random()) * Math.exp(-phase * 3.1);
    const ir = phase < 0.22 ? near : phase < 0.55 ? far : distant;
    mix(dst, ir, (ctx.random() < 0.42 ? -1 : 1) * gain, at(delay));
  }
  const accent = (0.31 + 0.19 * ctx.random()) * span;
  mix(dst, far, 0.13 * presence, at(accent));
  mix(dst, distant, -0.095 * presence, at(accent + 0.012 + ctx.random() * 0.024));
}

// A short bell-shaped swell made from independent low and mid noise bands.
export function rumble(ctx: RenderContext, cutoff: number, rise: number, decay: number, texture: number): Float32Array {
  const air = noise(ctx.random, 'pink');
  const ground = noise(ctx.random, 'brown');
  const low = biquad('lowpass', cutoff, 0.77, ctx.sampleRate);
  const sub = biquad('highpass', 26, 0.71, ctx.sampleRate);
  const mid = biquad('bandpass', cutoff * 2.95, 0.63, ctx.sampleRate);
  const grit = biquad('bandpass', cutoff * 7, 0.70, ctx.sampleRate);
  const movement = biquad('lowpass', 8, 0.68, ctx.sampleRate);
  return renderSamples(ctx, (t) => {
    const riseGain = Math.min(1, t / rise);
    const shape = riseGain ** 1.46 * Math.exp(-Math.max(0, t - rise) / decay);
    const mass = ground();
    const hiss = air();
    const swells = 0.82 + Math.max(-0.24, Math.min(0.32, movement(mass) * 9.5));
    return shape * swells * (sub(low(mass)) * 0.94 + texture * (mid(hiss) * 1.55 + grit(hiss) * 0.36));
  });
}
