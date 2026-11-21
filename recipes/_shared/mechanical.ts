import { biquad, envelope, layer, mix, noise, renderSamples } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';
import { pressure, scatter } from './acoustics.ts';

interface Report {
  span: number;
  low: number;
  high: number;
  edge: number;
  weight: number;
  tail: number;
  presence: number;
}

export function discharge(ctx: RenderContext, voice: Report): Float32Array {
  const signal = new Float32Array(ctx.frames);
  const direct = pressure({ ...ctx, frames: Math.round(ctx.sampleRate * 0.05) }, voice);
  mix(signal, direct);
  scatter(ctx, signal, direct, voice.tail, voice.presence, voice.high * 1.36);
  return signal;
}

interface Contact {
  body: number;
  bright: number;
  damping: number;
}

export function contact(ctx: RenderContext, { body, bright, damping }: Contact): Float32Array {
  const metal = noise(ctx.random, 'white');
  const seed = 0.93 + ctx.random() * 0.14;
  const thunk = biquad('bandpass', body * seed, 0.81, ctx.sampleRate);
  const edge = biquad('highpass', bright * 0.67, 0.69, ctx.sampleRate);
  const components = [
    biquad('bandpass', bright * seed, 9.7, ctx.sampleRate),
    biquad('bandpass', bright * 1.57 * seed, 13.1, ctx.sampleRate),
    biquad('bandpass', bright * 2.43 * seed, 15.9, ctx.sampleRate),
  ];
  return renderSamples(ctx, (t) => {
    const source = metal();
    const impact = source * envelope(t, 0.00013, damping * 0.3);
    const ringing = components[0](impact) * 0.94 + components[1](impact) * 0.48 + components[2](impact) * 0.27;
    return thunk(source) * envelope(t, 0.00027, damping) * 2.45 + 0.64 * edge(impact) +
      ringing * envelope(t, 0.0003, damping * 1.45) * 1.8;
  });
}

export function scrape(ctx: RenderContext, center: number, duration: number, grit: number): Float32Array {
  const air = noise(ctx.random, 'pink');
  const fibers = biquad('bandpass', center, 0.77, ctx.sampleRate);
  const edge = biquad('bandpass', center * 2.13, 0.87, ctx.sampleRate);
  const length = Math.min(ctx.frames, Math.round(duration * ctx.sampleRate));
  const sound = new Float32Array(ctx.frames);
  const breaks = 9;
  let changeAt = 0;
  let texture = 1;
  for (let i = 0; i < length; i++) {
    const x = i / length;
    if (i >= changeAt) {
      changeAt += Math.max(1, Math.round(length / breaks * (0.46 + ctx.random() * 1.04)));
      texture = 0.22 + ctx.random() * 0.94;
    }
    const source = air();
    sound[i] = Math.sin(Math.PI * x) ** 1.35 * texture * (1.46 * fibers(source) + grit * edge(source));
  }
  for (let i = 0; i < 5; i++) {
    const at = duration * (0.1 + ctx.random() * 0.82);
    layer(ctx, sound, at, 0.018, (grain) =>
      contact(grain, { body: center * 0.59, bright: center * 1.45, damping: 0.0013 }), 0.05 + 0.1 * grit);
  }
  return sound;
}
