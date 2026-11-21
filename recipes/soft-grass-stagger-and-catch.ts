import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGrass from './_recordings/natural-grass.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalGrassDrag from './_recordings/natural-grass-drag.ts';

export default {
  id: 'soft-grass-stagger-and-catch', name: "Soft grass stagger and catch", category: 'Footsteps & UI',
  tags: ["grass", "turf", "meadow", "quiet", "footstep", "stumble", "recovery", "trip"],
  loopable: false, durationSec: 0.852, mixRole: 'foley', targetRmsDbfs: -30,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGrass, jacketMovementRustle, naturalGrassDrag),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalGrass, 0, 0.3333, 0.67, 1.08, 9600, 0, 0.001, 0.022],
      [naturalGrass, 0.146, 0.3789, 0.84, 0.95, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.229, 0.21, 0.19, 1.04, 5700, 0, 0.001, 0.022],
      [naturalGrass, 0.406, 0.3956, 1, 0.91, 9600, 0, 0.001, 0.022],
      [naturalGrassDrag, 0.536, 0.23, 0.18, 1.02, 5400, 0, 0.001, 0.045],
    ]);
  },
} satisfies SoundRecipe;
