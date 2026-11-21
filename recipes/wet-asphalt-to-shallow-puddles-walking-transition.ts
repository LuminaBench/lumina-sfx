import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalAsphalt from './_recordings/natural-asphalt.ts';
import naturalPuddles from './_recordings/natural-puddles.ts';
import shallowWaterFootstep from './_recordings/shallow-water-footstep.ts';

export default {
  id: 'wet-asphalt-to-shallow-puddles-walking-transition', name: "Wet asphalt to shallow puddles walking transition", category: 'Footsteps & UI',
  tags: ["rain", "street", "pavement", "water", "wet", "splash", "puddle", "footstep", "crossing", "threshold", "transition", "walk"],
  loopable: false, durationSec: 2.276, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalAsphalt, naturalPuddles, shallowWaterFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalAsphalt, 0, 0.3283, 0.66, 0.99, 7200, 0, 0.001, 0.022],
      [naturalAsphalt, 0.465, 0.325, 0.78, 1, 10500, 0, 0.001, 0.022],
      [naturalPuddles, 0.94, 0.735, 1, 1, 10500, 0, 0.001, 0.022],
      [shallowWaterFootstep, 1.04, 0.16, 0.1, 1.07, 5900, 0, 0.001, 0.022],
      [naturalPuddles, 1.424, 0.7, 0.82, 1.05, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
