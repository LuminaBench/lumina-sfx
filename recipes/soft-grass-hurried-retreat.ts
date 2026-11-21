import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGrass from './_recordings/natural-grass.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'soft-grass-hurried-retreat', name: "Soft grass hurried retreat", category: 'Footsteps & UI',
  tags: ["grass", "turf", "meadow", "quiet", "footstep", "retreat", "run", "recede", "escape"],
  loopable: false, durationSec: 1.688, mixRole: 'foley', targetRmsDbfs: -31,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGrass, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalGrass, 0, 0.3396, 1, 1.06, 9600, 0, 0.001, 0.022],
      [naturalGrass, 0.238, 0.3462, 0.79, 1.04, 7400, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.327, 0.21, 0.14, 1.04, 5700, 0, 0.001, 0.022],
      [naturalGrass, 0.557, 0.3303, 0.54, 1.09, 5500, 0, 0.001, 0.022],
      [naturalGrass, 0.902, 0.3462, 0.32, 1.04, 3700, 0, 0.001, 0.022],
      [naturalGrass, 1.285, 0.3529, 0.17, 1.02, 2400, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
