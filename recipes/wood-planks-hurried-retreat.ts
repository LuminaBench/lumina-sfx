import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalPlanks from './_recordings/natural-planks.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'wood-planks-hurried-retreat', name: "Wood planks hurried retreat", category: 'Footsteps & UI',
  tags: ["boardwalk", "plank", "deck", "wooden", "footstep", "retreat", "run", "recede", "escape"],
  loopable: false, durationSec: 1.619, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalPlanks, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalPlanks, 0, 0.2113, 1, 1.06, 9600, 0, 0.001, 0.022],
      [naturalPlanks, 0.238, 0.2154, 0.79, 1.04, 7400, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.327, 0.21, 0.14, 1.04, 5700, 0, 0.001, 0.022],
      [naturalPlanks, 0.557, 0.2055, 0.54, 1.09, 5500, 0, 0.001, 0.022],
      [naturalPlanks, 0.902, 0.2154, 0.32, 1.04, 3700, 0, 0.001, 0.022],
      [naturalPlanks, 1.285, 0.2196, 0.17, 1.02, 2400, 0, 0.001, 0.022],
    ], { taps: [0.024, 0.064], send: 0.125, dampingHz: 3300 });
  },
} satisfies SoundRecipe;
