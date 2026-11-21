import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalPlanks from './_recordings/natural-planks.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'wood-planks-walk-into-a-jog', name: "Wood planks walk into a jog", category: 'Footsteps & UI',
  tags: ["boardwalk", "plank", "deck", "wooden", "footstep", "walk", "jog", "accelerate", "gait"],
  loopable: false, durationSec: 2.104, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalPlanks, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalPlanks, 0, 0.2286, 0.71, 0.98, 9600, 0, 0.001, 0.022],
      [naturalPlanks, 0.571, 0.2196, 0.74, 1.02, 9600, 0, 0.001, 0.022],
      [naturalPlanks, 1.04, 0.224, 0.82, 1, 9600, 0, 0.001, 0.022],
      [naturalPlanks, 1.402, 0.2113, 0.94, 1.06, 9600, 0, 0.001, 0.022],
      [naturalPlanks, 1.711, 0.2154, 1, 1.04, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 1.78, 0.21, 0.11, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.024, 0.064], send: 0.125, dampingHz: 3300 });
  },
} satisfies SoundRecipe;
