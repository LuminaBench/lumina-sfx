import { biquad, layer, mix, punch, reverb, tone, envelope, sweep } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';
import { pressure, rumble } from './acoustics.ts';
import { contact, scrape } from './mechanical.ts';

type Perspective = 'close' | 'hall' | 'alley' | 'field' | 'behind' | 'overlook' | 'canyon';

interface Report {
  span: number;
  body: number;
  crack: number;
  edge: number;
  action: number;
  space: Perspective;
  hits?: readonly number[];
}

const spaces = {
  close: { cutoff: 9800, echoes: [[0.015, 0.19], [0.043, -0.10]] },
  hall: { cutoff: 2000, echoes: [[0.010, 0.49], [0.018, -0.31], [0.026, 0.30], [0.037, 0.27], [0.045, -0.22], [0.058, 0.24], [0.079, -0.17], [0.13, 0.13]] },
  alley: { cutoff: 3600, echoes: [[0.022, -0.34], [0.034, 0.31], [0.064, -0.26], [0.083, 0.23], [0.129, 0.15], [0.205, -0.13], [0.29, 0.07]] },
  field: { cutoff: 6100, echoes: [[0.041, 0.18], [0.082, -0.14], [0.119, 0.10], [0.137, 0.08]] },
  behind: { cutoff: 560, echoes: [[0.025, 0.44], [0.048, -0.24], [0.064, 0.24], [0.11, 0.13], [0.19, 0.07]] },
  overlook: { cutoff: 930, echoes: [[0.063, 0.40], [0.178, -0.30], [0.306, 0.18], [0.431, 0.11]] },
  canyon: { cutoff: 1540, echoes: [[0.052, 0.27], [0.16, -0.19], [0.313, 0.29], [0.489, -0.20], [0.66, 0.13]] },
} satisfies Record<Perspective, { cutoff: number; echoes: readonly (readonly [number, number])[] }>;

export function arenaReport(ctx: RenderContext, spec: Report, body: number): Float32Array {
  const sound = new Float32Array(ctx.frames);
  const { sampleRate } = ctx;
  const { cutoff, echoes } = spaces[spec.space];
  // A nearby wall darkens the reflected field while the direct crack stays bright.
  const directCutoff = spec.space === 'hall' ? 8700 : spec.space === 'alley' ? 7500 : cutoff;
  for (const [index, cue] of (spec.hits ?? [0]).entries()) {
    const at = cue + (index === 0 ? 0 : (ctx.random() - 0.5) * 0.008);
    const mass = 0.88 + body * 0.30;
    const force = index === 0 ? 1 : 0.87 + 0.14 * ctx.random();
    const coreCtx = { ...ctx, frames: Math.round(sampleRate * Math.max(0.05, spec.span * 6)) };
    const core = pressure(coreCtx, {
      span: spec.span * mass, low: spec.body / mass, high: spec.crack,
      weight: mass, edge: spec.edge * (0.96 + ctx.random() * 0.11),
    });
    const filtered = core.map(biquad('lowpass', directCutoff, 0.73, sampleRate));
    mix(sound, filtered, force, Math.round(at * sampleRate));
    const bodyDecay = 0.011 + spec.span * 1.75;
    layer(ctx, sound, at + 0.002, bodyDecay * 5, part =>
      rumble(part, Math.min(cutoff * 0.4, spec.body * 2.1), 0.0025, bodyDecay, 0.46),
    force * mass * 0.69);
    for (const [delay, gain] of echoes) {
      const wet = filtered.map(biquad('lowpass', cutoff / (1.29 + delay * 2.8), 0.66, sampleRate));
      mix(sound, wet, gain * force, Math.round((at + delay * (0.94 + 0.12 * ctx.random())) * sampleRate));
    }
    if (spec.action > 0) {
      layer(ctx, sound, at + 0.012 + 0.012 * ctx.random(), 0.07, (part) =>
        contact(part, { body: 660, bright: 3940, damping: 0.0033 }), spec.action * force);
    }
  }
  return spec.space === 'hall' ? reverb(sound, sampleRate, 'room', 0.14) : sound;
}

interface Mechanism {
  snaps: readonly (readonly [time: number, body: number, bright: number, decay: number, gain: number])[];
  slide?: readonly [time: number, duration: number, center: number, gain: number];
}

export function arenaMechanism(ctx: RenderContext, spec: Mechanism, firmness: number): Float32Array {
  const sound = new Float32Array(ctx.frames);
  for (const [time, body, bright, damping, gain] of spec.snaps) {
    const tone = 0.91 + firmness * 0.18;
    layer(ctx, sound, time * (0.98 + ctx.random() * 0.04), damping * 9, (part) =>
      contact(part, { body: body * tone, bright: bright * tone, damping }), gain);
  }
  if (spec.slide) {
    const [at, duration, center, gain] = spec.slide;
    layer(ctx, sound, at, duration, part => scrape(part, center, duration, firmness + 0.2), gain);
  }
  return sound;
}

export function pneumaticReport(ctx: RenderContext, pop: number): Float32Array {
  const sound = punch(ctx, [
    { kind: 'highpass', color: 'white', hz: 4600, attack: 0.00018, decay: 0.005, gain: 0.29 + 0.60 * pop },
    { kind: 'bandpass', color: 'pink', hz: 1180, attack: 0.0005, decay: 0.021, gain: 1.04 },
    { kind: 'bandpass', color: 'white', hz: 2130, attack: 0.003, decay: 0.052, gain: 0.41 },
  ]);
  mix(sound, tone(ctx, t => sweep(960, 292, 0.007, t), t => envelope(t, 0.00052, 0.012)), 0.29);
  return sound;
}
