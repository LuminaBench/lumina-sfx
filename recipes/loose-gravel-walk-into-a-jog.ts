import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGravel from './_recordings/natural-gravel.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'loose-gravel-walk-into-a-jog', name: "Loose gravel walk into a jog", category: 'Footsteps & UI',
  tags: ["grit", "pebbles", "trail", "footstep", "walk", "jog", "accelerate", "gait"],
  loopable: false, durationSec: 2.195, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGravel, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalGravel, 0, 0.352, 0.71, 0.98, 9600, 0, 0.001, 0.022],
      [naturalGravel, 0.571, 0.3382, 0.74, 1.02, 9600, 0, 0.001, 0.022],
      [naturalGravel, 1.04, 0.345, 0.82, 1, 9600, 0, 0.001, 0.022],
      [naturalGravel, 1.402, 0.3255, 0.94, 1.06, 9600, 0, 0.001, 0.022],
      [naturalGravel, 1.711, 0.3317, 1, 1.04, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 1.78, 0.21, 0.11, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
