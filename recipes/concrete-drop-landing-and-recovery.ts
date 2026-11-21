import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalConcrete from './_recordings/natural-concrete.ts';
import sneakerPivotSqueak from './_recordings/sneaker-pivot-squeak.ts';

export default {
  id: 'concrete-drop-landing-and-recovery', name: "Concrete drop landing and recovery", category: 'Footsteps & UI',
  tags: ["pavement", "cement", "hard", "footstep", "drop", "heavy", "landing", "stumble"],
  loopable: false, durationSec: 0.9, mixRole: 'foley', targetRmsDbfs: -22,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, naturalConcrete, sneakerPivotSqueak),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.2, 0.22, 1.04, 5700, 0, 0.001, 0.022],
      [naturalConcrete, 0.061, 0.4349, 1, 0.86, 9600, 0, 0.001, 0.022],
      [naturalConcrete, 0.109, 0.3979, 0.78, 0.94, 9600, 0, 0.001, 0.022],
      [sneakerPivotSqueak, 0.177, 0.29, 0.31, 0.9, 7200, 0, 0.001, 0.045],
      [naturalConcrete, 0.469, 0.3495, 0.31, 1.07, 5400, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
