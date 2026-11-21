import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGrass from './_recordings/natural-grass.ts';
import naturalGrassDrag from './_recordings/natural-grass-drag.ts';

export default {
  id: 'soft-grass-tight-turning-pivot', name: "Soft grass tight turning pivot", category: 'Footsteps & UI',
  tags: ["grass", "turf", "meadow", "quiet", "footstep", "pivot", "turn", "scrape"],
  loopable: false, durationSec: 0.711, mixRole: 'foley', targetRmsDbfs: -32,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGrass, naturalGrassDrag),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalGrass, 0, 0.22, 0.72, 1, 9600, 0, 0.001, 0.022],
      [naturalGrassDrag, 0.069, 0.35, 0.59, 1.07, 7800, 0, 0.001, 0.045],
      [naturalGrass, 0.331, 0.3303, 0.37, 1.09, 6100, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
