import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGrass from './_recordings/natural-grass.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'soft-grass-walk-into-a-jog', name: "Soft grass walk into a jog", category: 'Footsteps & UI',
  tags: ["grass", "turf", "meadow", "quiet", "footstep", "walk", "jog", "accelerate", "gait"],
  loopable: false, durationSec: 2.107, mixRole: 'foley', targetRmsDbfs: -31,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGrass, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalGrass, 0, 0.3673, 0.71, 0.98, 9600, 0, 0.001, 0.022],
      [naturalGrass, 0.571, 0.3529, 0.74, 1.02, 9600, 0, 0.001, 0.022],
      [naturalGrass, 1.04, 0.36, 0.82, 1, 9600, 0, 0.001, 0.022],
      [naturalGrass, 1.402, 0.3396, 0.94, 1.06, 9600, 0, 0.001, 0.022],
      [naturalGrass, 1.711, 0.3462, 1, 1.04, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 1.78, 0.21, 0.11, 1.04, 5700, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
