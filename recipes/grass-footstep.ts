import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGrass from './_recordings/natural-grass.ts';
import naturalGrassDrag from './_recordings/natural-grass-drag.ts';

export default {
  id: 'grass-footstep', name: "Grass Footstep", category: 'Footsteps & UI',
  tags: ["grass", "turf", "meadow", "quiet", "footstep", "walk"],
  loopable: false, durationSec: 0.47, mixRole: 'foley', targetRmsDbfs: -31,
  params: { dryness: { label: 'Dryness', min: 0, max: 1, default: 0.55 } },
  ...performanceCredits(naturalGrass, naturalGrassDrag),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.dryness, [
      [naturalGrass, 0, 0.3854, 1, 0.99, 5200 + params.dryness * 4800, 0, 0.001, 0.022],
      [naturalGrassDrag, 0.085, 0.2068, 0.05 + params.dryness * 0.12, 1.07, 4700, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
