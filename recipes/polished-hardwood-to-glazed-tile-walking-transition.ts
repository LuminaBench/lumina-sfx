import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import hardwoodFootstep from './_recordings/hardwood-footstep.ts';
import ceramicTileFootstep from './_recordings/ceramic-tile-footstep.ts';
import sneakerPivotSqueak from './_recordings/sneaker-pivot-squeak.ts';

export default {
  id: 'polished-hardwood-to-glazed-tile-walking-transition', name: "Polished hardwood to glazed tile walking transition", category: 'Footsteps & UI',
  tags: ["indoor", "oak", "wooden", "floor", "ceramic", "tile", "footstep", "crossing", "threshold", "transition", "walk"],
  loopable: false, durationSec: 1.817, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(hardwoodFootstep, ceramicTileFootstep, sneakerPivotSqueak),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [hardwoodFootstep, 0, 0.2424, 0.66, 0.99, 7200, 0, 0.001, 0.022],
      [hardwoodFootstep, 0.465, 0.24, 0.78, 1, 10500, 0, 0.001, 0.022],
      [ceramicTileFootstep, 0.94, 0.269, 1, 1, 10500, 0, 0.001, 0.022],
      [sneakerPivotSqueak, 1.04, 0.16, 0.1, 1.07, 5900, 0, 0.001, 0.022],
      [ceramicTileFootstep, 1.424, 0.2562, 0.82, 1.05, 10500, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
