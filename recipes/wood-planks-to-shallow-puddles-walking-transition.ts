import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalPlanks from './_recordings/natural-planks.ts';
import naturalPuddles from './_recordings/natural-puddles.ts';
import shallowWaterFootstep from './_recordings/shallow-water-footstep.ts';

export default {
  id: 'wood-planks-to-shallow-puddles-walking-transition', name: "Wood planks to shallow puddles walking transition", category: 'Footsteps & UI',
  tags: ["boardwalk", "plank", "deck", "wooden", "water", "wet", "splash", "puddle", "footstep", "crossing", "threshold", "transition", "walk"],
  loopable: false, durationSec: 2.276, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalPlanks, naturalPuddles, shallowWaterFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalPlanks, 0, 0.2263, 0.66, 0.99, 7200, 0, 0.001, 0.022],
      [naturalPlanks, 0.465, 0.224, 0.78, 1, 10500, 0, 0.001, 0.022],
      [naturalPuddles, 0.94, 0.735, 1, 1, 10500, 0, 0.001, 0.022],
      [shallowWaterFootstep, 1.04, 0.16, 0.1, 1.07, 5900, 0, 0.001, 0.022],
      [naturalPuddles, 1.424, 0.7, 0.82, 1.05, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
