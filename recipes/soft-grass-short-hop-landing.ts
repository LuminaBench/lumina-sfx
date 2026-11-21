import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalGrass from './_recordings/natural-grass.ts';
import naturalGrassDrag from './_recordings/natural-grass-drag.ts';

export default {
  id: 'soft-grass-short-hop-landing', name: "Soft grass short hop landing", category: 'Footsteps & UI',
  tags: ["grass", "turf", "meadow", "quiet", "footstep", "jump", "landing", "hop"],
  loopable: false, durationSec: 0.501, mixRole: 'foley', targetRmsDbfs: -30,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, naturalGrass, naturalGrassDrag),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.14, 0.16, 1.04, 5700, 0, 0.001, 0.022],
      [naturalGrass, 0.084, 0.3673, 1, 0.98, 9600, 0, 0.001, 0.022],
      [naturalGrass, 0.118, 0.3333, 0.54, 1.08, 6200, 0, 0.001, 0.022],
      [naturalGrassDrag, 0.177, 0.18, 0.14, 1.1, 7500, 0, 0.001, 0.045],
    ]);
  },
} satisfies SoundRecipe;
