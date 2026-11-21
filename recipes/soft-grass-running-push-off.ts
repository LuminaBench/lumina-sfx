import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGrass from './_recordings/natural-grass.ts';
import naturalGrassDrag from './_recordings/natural-grass-drag.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'soft-grass-running-push-off', name: "Soft grass running push off", category: 'Footsteps & UI',
  tags: ["grass", "turf", "meadow", "quiet", "footstep", "jump", "takeoff", "toe", "burst"],
  loopable: false, durationSec: 0.351, mixRole: 'foley', targetRmsDbfs: -31,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGrass, naturalGrassDrag, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalGrass, 0, 0.17, 0.79, 1.11, 9600, 0, 0.001, 0.022],
      [naturalGrassDrag, 0.098, 0.19, 0.31, 1.23, 8100, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.091, 0.21, 0.14, 1.04, 5700, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
