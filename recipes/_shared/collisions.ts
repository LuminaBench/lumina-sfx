import { biquad, layer, mix, modal, noise, punch, renderSamples, reverb } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';
import { pressure, rumble, scatter } from './acoustics.ts';
import { brush, foleyGrain, softContact } from './foley.ts';

interface Blast {
  mass: number;
  distance: number;
  tail: number;
  debris: number;
}

export function blast(ctx: RenderContext, { mass, distance, tail, debris }: Blast): Float32Array {
  const sound = new Float32Array(ctx.frames);
  const front = pressure({ ...ctx, frames: Math.round(ctx.sampleRate * 0.105) }, {
    span: 0.0031 + 0.010 * mass + 0.0063 * distance, low: 265 - 143 * mass,
    high: 2400 - distance * 1640, edge: 1.43 - 0.90 * distance, weight: 1.08 + mass * 1.77,
  });
  mix(sound, front);
  scatter(ctx, sound, front, tail * 0.54, 0.76 + distance * 0.71, 3100 - distance * 2130);
  for (const [at, cutoff, gain] of [
    [0.006, 141 - mass * 32, 1.97 + 0.88 * mass],
    [tail * (0.12 + ctx.random() * 0.08), 110 - mass * 24, 1.31 + mass * 0.61],
    [tail * (0.37 + ctx.random() * 0.12), 89 - mass * 18, 0.65 + mass * 0.74],
  ]) {
    layer(ctx, sound, at, tail * 1.68, (roll) =>
      rumble(roll, cutoff * (1 - distance * 0.29), 0.019 + at * 0.19, 0.08 + tail * 0.19,
        0.98 - distance * 0.55), gain);
  }
  const count = Math.round(7 + debris * 18);
  for (let i = 0; i < count; i++) {
    const time = ctx.random() ** 1.54;
    foleyGrain(ctx, sound, {
      at: 0.046 + time * tail, center: 710 + ctx.random() * 2140, edge: 2820 + ctx.random() * 4350,
      duration: 0.002 + ctx.random() * 0.010, level: debris * (0.08 + 0.58 * ctx.random()) * (1 - 0.82 * time),
    });
  }
  return sound;
}

type CrashKind = 'bump' | 'crash' | 'scrape';

export function carCollision(ctx: RenderContext, kind: CrashKind, force: number): Float32Array {
  const sound = new Float32Array(ctx.frames);
  const heavy = kind === 'crash';
  const scraping = kind === 'scrape';
  const weight = heavy ? 1.18 : scraping ? 0.40 : 0.58 + force * 0.49;
  layer(ctx, sound, 0, 0.15, (hit) =>
    softContact(hit, { firmness: 0.24 + weight * 0.39, length: 0.019 + weight * 0.013, texture: 0.74 }), weight);
  if (heavy) {
    layer(ctx, sound, 0.004, 0.14, (hit) =>
      pressure(hit, { span: 0.0064, low: 395, high: 2500, edge: 0.45, weight: 1.94 }), 0.56);
  }
  const folds = heavy ? 7 : scraping ? 5 : 3;
  for (let i = 0; i < folds; i++) {
    const t = (i + ctx.random()) / folds;
    const at = 0.009 + t ** 1.7 * (scraping ? 0.81 : heavy ? 0.22 : 0.12);
    const resonance = 275 + (1 - t) * 480 + 285 * ctx.random();
    layer(ctx, sound, at, 0.21, (panel) => {
      const impact = punch(panel, [
        { color: 'white', kind: 'bandpass', hz: resonance * 2.8, q: 0.9, gain: 1.2, attack: 0.0017, decay: 0.023 },
        { color: 'pink', kind: 'bandpass', hz: resonance, q: 0.71, gain: 1.14, attack: 0.001, decay: 0.043 },
      ]);
      mix(impact, modal(panel, 'metal', resonance, 0.018 + 0.013 * t), 0.16 + 0.21 * weight);
      return impact;
    }, (0.81 - 0.52 * t) * (0.74 + weight * 0.33));
  }
  if (heavy) {
    const pieces = Math.round(18 + force * 35);
    for (let i = 0; i < pieces; i++) {
      const time = ctx.random() ** 2.3;
      foleyGrain(ctx, sound, {
        at: 0.028 + time * 0.62, center: 1650 + ctx.random() * 3410, edge: 4290 + ctx.random() * 5430,
        duration: 0.0016 + ctx.random() * 0.0082, level: (0.07 + 0.78 * ctx.random() ** 3.2) *
          (0.46 + force * 0.74) * (1 - 0.81 * time),
      });
    }
  }
  if (scraping) {
    layer(ctx, sound, 0.004, 1.22, (slide) => {
      const white = noise(slide.random, 'white');
      const scrape = biquad('bandpass', 1220 + force * 1210, 0.80, slide.sampleRate);
      const ring = biquad('bandpass', 2740 + force * 2130, 4.2, slide.sampleRate);
      const chatter = biquad('lowpass', 53, 0.70, slide.sampleRate);
      return renderSamples(slide, (t) => {
        const sample = white();
        const drag = Math.min(1, t / 0.084) * Math.exp(-Math.max(0, t - 0.46) / 0.17);
        return (scrape(sample) * 0.86 + ring(sample) * 0.92) * drag *
          Math.max(0.22, 0.77 + chatter(sample) * 17);
      });
    }, 0.85);
    layer(ctx, sound, 0.54, 0.43, (slide) => brush(slide, 912, 3290, 0.06, 0.085, 0.82), 0.55);
  }
  return reverb(sound, ctx.sampleRate, 'outdoor', heavy ? 0.32 : 0.12);
}
