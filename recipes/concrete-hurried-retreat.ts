import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalConcrete from './_recordings/natural-concrete.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'concrete-hurried-retreat', name: "Concrete hurried retreat", category: 'Footsteps & UI',
  tags: ["pavement", "cement", "hard", "footstep", "retreat", "run", "recede", "escape"],
  loopable: false, durationSec: 1.734, mixRole: 'foley', targetRmsDbfs: -24,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalConcrete, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalConcrete, 0, 0.3528, 1, 1.06, 9600, 0, 0.001, 0.022],
      [naturalConcrete, 0.238, 0.3596, 0.79, 1.04, 7400, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.327, 0.21, 0.14, 1.04, 5700, 0, 0.001, 0.022],
      [naturalConcrete, 0.557, 0.3431, 0.54, 1.09, 5500, 0, 0.001, 0.022],
      [naturalConcrete, 0.902, 0.3596, 0.32, 1.04, 3700, 0, 0.001, 0.022],
      [naturalConcrete, 1.285, 0.3667, 0.17, 1.02, 2400, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
