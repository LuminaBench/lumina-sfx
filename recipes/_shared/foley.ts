import { biquad, envelope, layer, noise, renderSamples } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';

interface Contact {
  firmness: number;
  texture: number;
  length: number;
}

export function softContact(ctx: RenderContext, { firmness, texture, length }: Contact): Float32Array {
  const grit = noise(ctx.random, 'white');
  const fiber = noise(ctx.random, 'pink');
  const floor = biquad('highpass', 41, 0.72, ctx.sampleRate);
  const sole = biquad('lowpass', 370 + firmness * 390, 0.70, ctx.sampleRate);
  const weight = biquad('bandpass', 168 + firmness * 83, 0.72, ctx.sampleRate);
  const skin = biquad('bandpass', 395 + firmness * 794, 0.74, ctx.sampleRate);
  const edge = biquad('bandpass', 1750 + firmness * 2200, 0.72, ctx.sampleRate);
  const width = length * (0.34 + ctx.random() * 0.14);
  return renderSamples(ctx, (t) => {
    const age = t / width;
    const attack = Math.min(1, age * 3.8);
    const load = floor(sole((1 - 1.7 * age) * Math.exp(-age * 2.3) * attack));
    const fine = grit();
    const body = fiber();
    return 0.83 * load + 2.4 * weight(body) * envelope(t, width * 0.64, length) +
      (0.63 + firmness * 0.37) * skin(fine) * envelope(t, width * 0.17, length * 0.49) +
      texture * 0.50 * edge(fine) * envelope(t, width * 0.10, length * 0.23);
  });
}

export function brush(ctx: RenderContext, center: number, upper: number,
  attack: number, decay: number, roughness: number): Float32Array {
  const grain = noise(ctx.random, 'white');
  const cloth = noise(ctx.random, 'pink');
  const rub = biquad('bandpass', center, 0.67, ctx.sampleRate);
  const edge = biquad('bandpass', upper, 0.74, ctx.sampleRate);
  const drag = biquad('lowpass', 47, 0.66, ctx.sampleRate);
  return renderSamples(ctx, (t) => {
    const sample = grain();
    const shift = 0.84 + 10 * roughness * Math.abs(drag(sample));
    return (rub(cloth()) * 1.23 + edge(sample) * roughness * 0.53) * shift *
      envelope(t, attack, decay) * Math.min(1, (ctx.frames / ctx.sampleRate - t) / 0.006);
  });
}

interface Grain {
  at: number;
  center: number;
  edge: number;
  duration: number;
  level: number;
}

export function foleyGrain(ctx: RenderContext, sound: Float32Array, grain: Grain): void {
  const { at, center, edge, duration, level } = grain;
  layer(ctx, sound, at, duration * 3.9, (particle) => {
    const white = noise(particle.random, 'white');
    const body = biquad('bandpass', center, 0.86, particle.sampleRate);
    const chip = biquad('bandpass', edge, 0.86, particle.sampleRate);
    return renderSamples(particle, (time) => {
      const x = white();
      return 1.22 * body(x) * envelope(time, duration * 0.13, duration * 0.68) +
        0.74 * chip(x) * envelope(time, duration * 0.07, duration * 0.34);
    });
  }, level);
}
