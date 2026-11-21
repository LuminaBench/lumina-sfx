import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalConcrete from './_recordings/natural-concrete.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'concrete-walk-into-a-jog', name: "Concrete walk into a jog", category: 'Footsteps & UI',
  tags: ["pavement", "cement", "hard", "footstep", "walk", "jog", "accelerate", "gait"],
  loopable: false, durationSec: 2.153, mixRole: 'foley', targetRmsDbfs: -24,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalConcrete, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalConcrete, 0, 0.3816, 0.71, 0.98, 9600, 0, 0.001, 0.022],
      [naturalConcrete, 0.571, 0.3667, 0.74, 1.02, 9600, 0, 0.001, 0.022],
      [naturalConcrete, 1.04, 0.374, 0.82, 1, 9600, 0, 0.001, 0.022],
      [naturalConcrete, 1.402, 0.3528, 0.94, 1.06, 9600, 0, 0.001, 0.022],
      [naturalConcrete, 1.711, 0.3596, 1, 1.04, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 1.78, 0.21, 0.11, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
