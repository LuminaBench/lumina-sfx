import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalAsphalt from './_recordings/natural-asphalt.ts';
import naturalGravel from './_recordings/natural-gravel.ts';
import naturalGravelDrag from './_recordings/natural-gravel-drag.ts';

export default {
  id: 'wet-asphalt-to-loose-gravel-walking-transition', name: "Wet asphalt to loose gravel walking transition", category: 'Footsteps & UI',
  tags: ["rain", "street", "pavement", "grit", "pebbles", "trail", "footstep", "crossing", "threshold", "transition", "walk"],
  loopable: false, durationSec: 1.905, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalAsphalt, naturalGravel, naturalGravelDrag),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalAsphalt, 0, 0.3283, 0.66, 0.99, 7200, 0, 0.001, 0.022],
      [naturalAsphalt, 0.465, 0.325, 0.78, 1, 10500, 0, 0.001, 0.022],
      [naturalGravel, 0.94, 0.345, 1, 1, 10500, 0, 0.001, 0.022],
      [naturalGravelDrag, 1.04, 0.16, 0.1, 1.07, 5900, 0, 0.001, 0.022],
      [naturalGravel, 1.424, 0.3286, 0.82, 1.05, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
