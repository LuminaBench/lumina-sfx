import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalConcrete from './_recordings/natural-concrete.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import sneakerPivotSqueak from './_recordings/sneaker-pivot-squeak.ts';

export default {
  id: 'concrete-stagger-and-catch', name: "Concrete stagger and catch", category: 'Footsteps & UI',
  tags: ["pavement", "cement", "hard", "footstep", "stumble", "recovery", "trip"],
  loopable: false, durationSec: 0.899, mixRole: 'foley', targetRmsDbfs: -23,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalConcrete, jacketMovementRustle, sneakerPivotSqueak),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalConcrete, 0, 0.3463, 0.67, 1.08, 9600, 0, 0.001, 0.022],
      [naturalConcrete, 0.146, 0.3937, 0.84, 0.95, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.229, 0.21, 0.19, 1.04, 5700, 0, 0.001, 0.022],
      [naturalConcrete, 0.406, 0.411, 1, 0.91, 9600, 0, 0.001, 0.022],
      [sneakerPivotSqueak, 0.536, 0.23, 0.18, 1.02, 5400, 0, 0.001, 0.045],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
