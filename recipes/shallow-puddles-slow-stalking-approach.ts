import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalPuddles from './_recordings/natural-puddles.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import shallowWaterFootstep from './_recordings/shallow-water-footstep.ts';

export default {
  id: 'shallow-puddles-slow-stalking-approach', name: "Shallow puddles slow stalking approach", category: 'Footsteps & UI',
  tags: ["water", "wet", "splash", "puddle", "footstep", "stealth", "approach", "sneak", "sequence"],
  loopable: false, durationSec: 2.495, mixRole: 'foley', targetRmsDbfs: -29,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalPuddles, jacketMovementRustle, shallowWaterFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalPuddles, 0, 0.735, 0.44, 1, 3600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.49, 0.21, 0.065, 1.04, 5700, 0, 0.001, 0.022],
      [naturalPuddles, 0.744, 0.7067, 0.64, 1.04, 4600, 0, 0.001, 0.022],
      [naturalPuddles, 1.601, 0.7424, 0.86, 0.99, 6100, 0, 0.001, 0.022],
      [shallowWaterFootstep, 1.746, 0.17, 0.11, 1.1, 4500, 0, 0.001, 0.045],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
