import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalConcrete from './_recordings/natural-concrete.ts';
import sneakerPivotSqueak from './_recordings/sneaker-pivot-squeak.ts';

export default {
  id: 'concrete-footstep', name: "Concrete Footstep", category: 'Footsteps & UI',
  tags: ["concrete", "boot", "pavement", "cement", "hard", "footstep", "walk"],
  loopable: false, durationSec: 0.43, mixRole: 'foley', targetRmsDbfs: -24,
  params: { heel: { label: 'Heel', min: 0, max: 1, default: 0.67 } },
  ...performanceCredits(naturalConcrete, sneakerPivotSqueak),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.heel, [
      [naturalConcrete, 0, 0.3526, 1, 0.99, 4300 + params.heel * 6900, 0, 0.001, 0.022],
      [sneakerPivotSqueak, 0.085, 0.1892, 0.13 - params.heel * 0.09, 1.07, 4700, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
