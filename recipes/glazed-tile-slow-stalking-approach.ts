import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import ceramicTileFootstep from './_recordings/ceramic-tile-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import sneakerPivotSqueak from './_recordings/sneaker-pivot-squeak.ts';

export default {
  id: 'glazed-tile-slow-stalking-approach', name: "Glazed tile slow stalking approach", category: 'Footsteps & UI',
  tags: ["ceramic", "tile", "indoor", "footstep", "stealth", "approach", "sneak", "sequence"],
  loopable: false, durationSec: 2.053, mixRole: 'foley', targetRmsDbfs: -27,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(ceramicTileFootstep, jacketMovementRustle, sneakerPivotSqueak),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [ceramicTileFootstep, 0, 0.269, 0.44, 1, 3600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.49, 0.21, 0.065, 1.04, 5700, 0, 0.001, 0.022],
      [ceramicTileFootstep, 0.744, 0.2587, 0.64, 1.04, 4600, 0, 0.001, 0.022],
      [ceramicTileFootstep, 1.601, 0.2717, 0.86, 0.99, 6100, 0, 0.001, 0.022],
      [sneakerPivotSqueak, 1.746, 0.17, 0.11, 1.1, 4500, 0, 0.001, 0.045],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
