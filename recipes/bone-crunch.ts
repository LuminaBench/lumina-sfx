import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/field-cabbage-chop.ts';
import foley1 from './_recordings/harvest-egg-crack.ts';
import { biquad, layer } from '../engine/dsp.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { brush, foleyGrain, softContact } from './_shared/foley.ts';

const original = {
  id: 'bone-crunch', name: 'Bone Crunch', category: 'Impacts',
  tags: ['bone', 'crunch', 'break', 'impact'], loopable: false, durationSec: 0.58,
  mixRole: 'foley',
  params: { splinter: { label: 'Splinter', min: 0, max: 1, default: 0.72 } },
  render(ctx, { params }) {
    const sound = new Float32Array(ctx.frames);
    const flex = 0.017 + ctx.random() * 0.015;
    const splinter = params.splinter;
    layer(ctx, sound, 0, 0.092, (joint) =>
      softContact(joint, { firmness: 0.51, texture: 0.56, length: 0.014 }), 0.61);
    foleyGrain(ctx, sound, { at: 0, center: 1520, edge: 4290, duration: 0.0042, level: 1.09 });
    layer(ctx, sound, 0.004, 0.17, (fibers) =>
      brush(fibers, 860, 2850, 0.009, 0.026, 0.54), 0.56);
    for (const [at, center, edge, level] of [
      [0.006, 1200, 3910, 0.51],
      [flex, 940, 4770, 0.94],
      [flex * 1.61, 1530, 5940, 0.55],
      [0.058 + flex * 0.56, 755, 3240, 0.62],
      [0.089 + flex, 1940, 5870, 0.23],
    ]) {
      const variation = 0.79 + ctx.random() * 0.41;
      foleyGrain(ctx, sound, {
        at, center: center * variation, edge: edge * variation,
        duration: 0.0025 + 0.0041 * ctx.random(), level: level * (0.64 + 0.52 * splinter),
      });
    }
    for (let i = 0; i < 15; i++) {
      const released = ctx.random() ** 1.6;
      foleyGrain(ctx, sound, {
        at: flex + 0.004 + released * 0.124,
        center: 630 + ctx.random() * 1430,
        edge: 2550 + ctx.random() * 2980,
        duration: 0.0016 + ctx.random() * 0.0052,
        level: (0.12 + ctx.random() * 0.33) * (1 - 0.68 * released) * (0.52 + splinter * 0.64),
      });
    }
    const air = biquad('lowpass', 4300 + splinter * 2200, 0.73, ctx.sampleRate);
    return sound.map(air);
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.145, gain: 0.93, cutoff: 6400, speed: 0.89 },
  { clip: foley1, at: 0.038, span: 0.124, gain: 0.42, cutoff: 8100, speed: 0.91 },
]);
