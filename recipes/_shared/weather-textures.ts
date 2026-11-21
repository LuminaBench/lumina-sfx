import { biquad, layer, mix, noise, punch, renderSamples, TAU } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';
import { pressure, rumble, scatter } from './acoustics.ts';
import { rainBed } from './weather.ts';

const surfaces = {
  mist: { body: 1340, edge: 5300, size: 0.24, bed: 0.69, damping: 0.0047 },
  glass: { body: 940, edge: 3950, size: 0.60, bed: 0.52, damping: 0.013 },
  roof: { body: 460, edge: 2120, size: 0.98, bed: 0.48, damping: 0.018 },
  leaves: { body: 575, edge: 2850, size: 0.76, bed: 0.60, damping: 0.011 },
  puddles: { body: 1500, edge: 3150, size: 0.99, bed: 0.57, damping: 0.011 },
  open: { body: 1580, edge: 4360, size: 0.63, bed: 0.85, damping: 0.008 },
  hail: { body: 1750, edge: 6600, size: 1.12, bed: 0.36, damping: 0.008 },
};

interface Rain {
  duration: number;
  material: keyof typeof surfaces;
  force: number;
  density: number;
  pace: number;
}

export function surfaceRain(ctx: RenderContext, rain: Rain): Float32Array {
  const { duration, material, force, density, pace } = rain;
  const surface = surfaces[material];
  const bed = rainBed(ctx, force * 0.79, density * 0.46, duration);
  const damping = biquad('lowpass', surface.edge * 0.91, 0.69, ctx.sampleRate);
  const growth = material === 'open' ? 0.29 : 0.11 + force * 0.08;
  const pulse = (t: number) => 0.9 + growth * Math.cos(TAU * pace * t / duration + 0.57);
  const sound = renderSamples(ctx, (t, i) => surface.bed * damping(bed[i]) * pulse(t));
  const events = Math.round(duration * (14 + 57 * density) * surface.size);
  for (let i = 0; i < events; i++) {
    const at = ctx.random() * ctx.frames / ctx.sampleRate;
    const tuning = 0.60 + 0.78 * ctx.random();
    const decay = surface.damping * (0.48 + ctx.random() * 0.83);
    const size = (0.10 + 0.88 * ctx.random() ** (material === 'leaves' ? 4.1 : 2.6)) * surface.size;
    layer(ctx, sound, at, Math.min(0.12, decay * 5.6), (drop) => punch(drop, [
      { color: 'white', kind: 'bandpass', hz: surface.body * tuning, q: material === 'roof' ? 2.5 : 1.52,
        gain: 1.15, attack: 0.00062, decay: decay * 1.17 },
      { color: 'white', kind: 'bandpass', hz: surface.edge * tuning, q: 1.34,
        gain: material === 'mist' ? 0.38 : 0.72, attack: 0.00018, decay: decay * 0.52 },
    ]), size * pulse(at));
  }
  return sound;
}

export function windBed(ctx: RenderContext, duration: number, gusts: number, force: number, edge: number): Float32Array {
  const air = noise(ctx.random, 'pink');
  const wash = noise(ctx.random, 'brown');
  const body = biquad('lowpass', 185 + force * 140, 0.69, ctx.sampleRate);
  const grass = biquad('bandpass', 1040 + edge * 1330, 0.65, ctx.sampleRate);
  const hollow = biquad('bandpass', 320 + edge * 365, 1.6 + edge * 3.1, ctx.sampleRate);
  const gust = biquad('lowpass', 7.7 + force * 5, 0.69, ctx.sampleRate);
  const phase = ctx.random() * TAU;
  return renderSamples(ctx, (t) => {
    const step = TAU * t / duration;
    const swell = (0.53 + 0.31 * Math.sin(step * gusts + phase) +
      0.16 * Math.cos(step * (gusts + 2) + 0.88)) ** (1.17 + force);
    const ground = wash();
    const breath = air();
    const flutter = Math.max(0.32, 0.89 + 7.4 * gust(ground));
    return body(ground) * (0.76 + 1.55 * swell * force) +
      (grass(breath) * (0.41 + 1.45 * edge) + hollow(breath) * (0.46 + edge * 1.24)) *
      (0.20 + (1.02 + force) * swell) * flutter;
  });
}

export function thunderPass(ctx: RenderContext, distance: number, double: boolean): Float32Array {
  const sound = new Float32Array(ctx.frames);
  const strike = (at: number, gain: number) => {
    layer(ctx, sound, at, 0.88, (section) => {
      const front = pressure({ ...section, frames: Math.round(section.sampleRate * 0.10) },
        { span: 0.007 + distance * 0.013, low: 280 - distance * 130, high: 2250 - distance * 1600,
          edge: 1.0 - distance * 0.64, weight: 1.9 });
      const hit = new Float32Array(section.frames);
      mix(hit, front);
      scatter(section, hit, front, 0.48, 1.17, 3800 - distance * 2890);
      return hit;
    }, gain);
  };
  strike(0, double ? 1.17 : 0.64);
  if (double) strike(0.38 + ctx.random() * 0.29, 0.83);
  for (const [at, rise, decay, gain] of [
    [0.015, 0.043, 0.57, 2.61],
    [0.27, 0.26, 0.77, 2.67],
    [0.83, 0.25, 0.96, 2.54],
    [1.71, 0.36, 0.83, 1.87],
    [2.58, 0.50, 0.91, 1.40],
    [3.58, 0.42, 1.13, 1.02],
    [4.8, 0.60, 0.98, 0.65],
  ]) {
    const cutoff = (102 + ctx.random() * 33) * (1 - distance * 0.33);
    layer(ctx, sound, at + at * ctx.random() * 0.11, rise + decay * 5.6,
      (roll) => rumble(roll, cutoff, rise, decay, 0.72 - distance * 0.38), gain);
  }
  return sound;
}
