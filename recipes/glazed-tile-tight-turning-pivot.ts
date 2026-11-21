import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import ceramicTileFootstep from './_recordings/ceramic-tile-footstep.ts';
import sneakerPivotSqueak from './_recordings/sneaker-pivot-squeak.ts';

export default {
  id: 'glazed-tile-tight-turning-pivot', name: "Glazed tile tight turning pivot", category: 'Footsteps & UI',
  tags: ["ceramic", "tile", "indoor", "footstep", "pivot", "turn", "scrape"],
  loopable: false, durationSec: 0.715, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(ceramicTileFootstep, sneakerPivotSqueak),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [ceramicTileFootstep, 0, 0.22, 0.72, 1, 9600, 0, 0.001, 0.022],
      [sneakerPivotSqueak, 0.069, 0.35, 0.59, 1.07, 7800, 0, 0.001, 0.045],
      [ceramicTileFootstep, 0.331, 0.2468, 0.37, 1.09, 6100, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
