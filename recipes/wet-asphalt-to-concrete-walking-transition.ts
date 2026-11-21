import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalAsphalt from './_recordings/natural-asphalt.ts';
import naturalConcrete from './_recordings/natural-concrete.ts';
import sneakerPivotSqueak from './_recordings/sneaker-pivot-squeak.ts';

export default {
  id: 'wet-asphalt-to-concrete-walking-transition', name: "Wet asphalt to concrete walking transition", category: 'Footsteps & UI',
  tags: ["rain", "street", "pavement", "cement", "hard", "footstep", "crossing", "threshold", "transition", "walk"],
  loopable: false, durationSec: 1.862, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalAsphalt, naturalConcrete, sneakerPivotSqueak),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalAsphalt, 0, 0.3283, 0.66, 0.99, 7200, 0, 0.001, 0.022],
      [naturalAsphalt, 0.465, 0.325, 0.78, 1, 10500, 0, 0.001, 0.022],
      [naturalConcrete, 0.94, 0.374, 1, 1, 10500, 0, 0.001, 0.022],
      [sneakerPivotSqueak, 1.04, 0.16, 0.1, 1.07, 5900, 0, 0.001, 0.022],
      [naturalConcrete, 1.424, 0.3562, 0.82, 1.05, 10500, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
