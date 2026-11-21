import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalPlanks from './_recordings/natural-planks.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import barnTimberCreak from './_recordings/barn-timber-creak.ts';

export default {
  id: 'wood-planks-slow-stalking-approach', name: "Wood planks slow stalking approach", category: 'Footsteps & UI',
  tags: ["boardwalk", "plank", "deck", "wooden", "footstep", "stealth", "approach", "sneak", "sequence"],
  loopable: false, durationSec: 2.03, mixRole: 'foley', targetRmsDbfs: -27,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalPlanks, jacketMovementRustle, barnTimberCreak),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalPlanks, 0, 0.224, 0.44, 1, 3600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.49, 0.21, 0.065, 1.04, 5700, 0, 0.001, 0.022],
      [naturalPlanks, 0.744, 0.2154, 0.64, 1.04, 4600, 0, 0.001, 0.022],
      [naturalPlanks, 1.601, 0.2263, 0.86, 0.99, 6100, 0, 0.001, 0.022],
      [barnTimberCreak, 1.746, 0.17, 0.11, 1.1, 4500, 0, 0.001, 0.045],
    ], { taps: [0.024, 0.064], send: 0.125, dampingHz: 3300 });
  },
} satisfies SoundRecipe;
