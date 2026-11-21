import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalConcrete from './_recordings/natural-concrete.ts';
import sneakerPivotSqueak from './_recordings/sneaker-pivot-squeak.ts';

export default {
  id: 'concrete-limping-gait', name: "Concrete limping gait", category: 'Footsteps & UI',
  tags: ["pavement", "cement", "hard", "footstep", "injured", "limp", "irregular", "walk", "cycle"],
  loopable: false, durationSec: 1.827, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalConcrete, sneakerPivotSqueak),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalConcrete, 0, 0.4022, 1, 0.93, 9600, 0, 0.001, 0.022],
      [sneakerPivotSqueak, 0.168, 0.27, 0.35, 0.86, 5600, 0, 0.001, 0.045],
      [naturalConcrete, 0.346, 0.3463, 0.41, 1.08, 5200, 0, 0.001, 0.022],
      [naturalConcrete, 1.047, 0.3896, 0.9, 0.96, 9600, 0, 0.001, 0.022],
      [sneakerPivotSqueak, 1.214, 0.22, 0.31, 0.9, 5800, 0, 0.001, 0.045],
      [naturalConcrete, 1.385, 0.3596, 0.37, 1.04, 5100, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
