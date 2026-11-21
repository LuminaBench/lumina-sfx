import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalConcrete from './_recordings/natural-concrete.ts';
import sneakerPivotSqueak from './_recordings/sneaker-pivot-squeak.ts';

export default {
  id: 'concrete-short-hop-landing', name: "Concrete short hop landing", category: 'Footsteps & UI',
  tags: ["pavement", "cement", "hard", "footstep", "jump", "landing", "hop"],
  loopable: false, durationSec: 0.548, mixRole: 'foley', targetRmsDbfs: -23,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, naturalConcrete, sneakerPivotSqueak),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.14, 0.16, 1.04, 5700, 0, 0.001, 0.022],
      [naturalConcrete, 0.084, 0.3816, 1, 0.98, 9600, 0, 0.001, 0.022],
      [naturalConcrete, 0.118, 0.3463, 0.54, 1.08, 6200, 0, 0.001, 0.022],
      [sneakerPivotSqueak, 0.177, 0.18, 0.14, 1.1, 7500, 0, 0.001, 0.045],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
