import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGrass from './_recordings/natural-grass.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalGrassDrag from './_recordings/natural-grass-drag.ts';

export default {
  id: 'soft-grass-slow-stalking-approach', name: "Soft grass slow stalking approach", category: 'Footsteps & UI',
  tags: ["grass", "turf", "meadow", "quiet", "footstep", "stealth", "approach", "sneak", "sequence"],
  loopable: false, durationSec: 2.015, mixRole: 'foley', targetRmsDbfs: -33,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGrass, jacketMovementRustle, naturalGrassDrag),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalGrass, 0, 0.36, 0.44, 1, 3600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.49, 0.21, 0.065, 1.04, 5700, 0, 0.001, 0.022],
      [naturalGrass, 0.744, 0.3462, 0.64, 1.04, 4600, 0, 0.001, 0.022],
      [naturalGrass, 1.601, 0.3636, 0.86, 0.99, 6100, 0, 0.001, 0.022],
      [naturalGrassDrag, 1.746, 0.17, 0.11, 1.1, 4500, 0, 0.001, 0.045],
    ]);
  },
} satisfies SoundRecipe;
