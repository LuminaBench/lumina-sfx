import { biquad, envelope, layer, mix, noise, renderSamples, reverb, tone } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';
import { pressure, rumble } from './acoustics.ts';
import { foleyGrain } from './foley.ts';

type Debris = 'stone' | 'glass' | 'dirt' | 'wood' | 'steel' | 'ice' | 'water' | 'none';
const scatterBands: Record<Debris, readonly [number, number, number]> = {
  stone: [630, 3130, 0.007], glass: [2600, 7500, 0.0033], dirt: [400, 1640, 0.014], wood: [490, 3820, 0.011],
  steel: [1450, 6550, 0.009], ice: [1210, 5120, 0.005], water: [305, 1920, 0.012], none: [0, 0, 0],
};

interface Burst {
  at: number;
  width: number;
  weight: number;
  bite: number;
  bloom: number;
}

interface Destruction {
  cracks: readonly Burst[];
  debris: Debris;
  debrisAt: number;
  debrisSpan: number;
  fragments: number;
  space: 'dry' | 'room' | 'outdoor';
  color?: number;
}

export function destruction(ctx: RenderContext, spec: Destruction, weight: number): Float32Array {
  const sound = new Float32Array(ctx.frames);
  const mass = 0.85 + weight * 0.32;
  const cutoff = spec.color ?? 6500;
  for (const burst of spec.cracks) {
    layer(ctx, sound, burst.at, burst.width * 12, (part) => pressure(part, {
      span: burst.width, low: 112 / mass, high: cutoff, edge: burst.bite, weight: burst.weight,
    }), 1);
    // Keep the pressure front sharp. Two damped bands carry the uneven low roll.
    layer(ctx, sound, burst.at + 0.004, burst.bloom * 5.5, part => {
      const air = noise(part.random, 'brown');
      const floor = biquad('highpass', 28, 0.7, part.sampleRate);
      const low = biquad('lowpass', (67 + 16 * part.random()) / mass, 0.95, part.sampleRate);
      const chest = biquad('bandpass', 145 / mass, 0.74, part.sampleRate);
      return renderSamples(part, time => {
        const grain = floor(air());
        const heavy = low(grain) * envelope(time, 0.009, burst.bloom * 1.28);
        const early = chest(grain) * envelope(time, 0.004, burst.bloom * 0.43);
        return heavy * 3.8 + early * 1.45;
      });
    }, burst.weight);
    layer(ctx, sound, burst.at + burst.width * 0.82, burst.bloom * 6.2,
      part => rumble(part, 195 / mass, 0.014 + burst.width, burst.bloom * 1.28, 0.60 + burst.bite * 0.29),
      burst.weight * 2.1);
  }
  if (spec.debris !== 'none') {
    const [center, edge, duration] = scatterBands[spec.debris];
    for (let i = 0; i < spec.fragments; i++) {
      const fraction = (i + ctx.random()) / spec.fragments;
      const pitch = 0.67 + ctx.random() * 0.73;
      foleyGrain(ctx, sound, {
        at: spec.debrisAt + fraction ** 1.44 * spec.debrisSpan,
        center: center * pitch, edge: edge * pitch, duration: duration * (1.21 - 0.55 * fraction),
        level: (0.13 + 0.52 * ctx.random()) * Math.exp(-fraction * 1.7),
      });
    }
  }
  if (spec.color) {
    const lowpass = biquad('lowpass', cutoff, 0.74, ctx.sampleRate);
    for (let i = 0; i < sound.length; i++) sound[i] = lowpass(sound[i]);
  }
  return spec.space === 'dry' ? sound : reverb(sound, ctx.sampleRate, spec.space, spec.space === 'room' ? 0.20 : 0.13);
}

export function dustAndRubble(ctx: RenderContext, kind: 'dust' | 'rubble' | 'ice', density: number): Float32Array {
  const [center, edge, length] = scatterBands[kind === 'dust' ? 'dirt' : kind === 'rubble' ? 'stone' : 'ice'];
  const count = Math.round((kind === 'dust' ? 24 : 16) * (0.73 + 0.47 * density));
  const span = ctx.frames / ctx.sampleRate * 0.88;
  const grit = noise(ctx.random, 'pink');
  const body = biquad('bandpass', center, 0.77, ctx.sampleRate);
  const air = biquad('bandpass', Math.max(1120, edge * 0.71), 0.73, ctx.sampleRate);
  const breath = kind === 'dust' ? 1.06 : 0.24;
  const sound = renderSamples(ctx, (t) => {
    const texture = grit();
    return (body(texture) * 0.85 + air(texture)) * envelope(t, 0.011, span * 0.24) * breath;
  });
  for (let i = 0; i < count; i++) {
    const x = (i + ctx.random()) / count;
    foleyGrain(ctx, sound, {
      at: i === 0 ? 0 : span * x ** 1.55, center: center * (0.56 + ctx.random() * 0.97),
      edge: edge * (0.64 + ctx.random() * 0.83), duration: length * (1.42 - 0.8 * x),
      level: (0.47 + ctx.random() * 0.64) * Math.exp(-x * 2),
    });
  }
  return sound;
}

export function suctionPop(ctx: RenderContext, weight: number): Float32Array {
  const air = noise(ctx.random, 'pink');
  const low = biquad('bandpass', 230, 0.73, ctx.sampleRate);
  const whistle = tone(ctx, t => 140 + 1300 * Math.min(1, t / 0.14) ** 3,
    t => envelope(t, 0.055, 0.029) * Math.max(0, Math.min(1, (0.15 - t) * 250)),
    p => Math.sin(p) * 0.60 + Math.sin(p * 1.99) * 0.21);
  const sound = renderSamples(ctx, (t, i) => low(air()) * envelope(t, 0.013, 0.075) * 1.15 + whistle[i] * 0.37);
  const push: Burst = { at: 0, width: 0.012, weight: 0.82, bite: 0.61, bloom: 0.097 };
  layer(ctx, sound, 0.15, 0.50, part =>
    destruction(part, { cracks: [push], debris: 'none', debrisAt: 0, debrisSpan: 0, fragments: 0, space: 'outdoor' }, weight));
  return sound;
}
