import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import ceramicTileFootstep from './_recordings/ceramic-tile-footstep.ts';
import sneakerPivotSqueak from './_recordings/sneaker-pivot-squeak.ts';

export default {
  id: 'glazed-tile-limping-gait', name: "Glazed tile limping gait", category: 'Footsteps & UI',
  tags: ["ceramic", "tile", "indoor", "footstep", "injured", "limp", "irregular", "walk", "cycle"],
  loopable: false, durationSec: 1.781, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(ceramicTileFootstep, sneakerPivotSqueak),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [ceramicTileFootstep, 0, 0.2892, 1, 0.93, 9600, 0, 0.001, 0.022],
      [sneakerPivotSqueak, 0.168, 0.27, 0.35, 0.86, 5600, 0, 0.001, 0.045],
      [ceramicTileFootstep, 0.346, 0.2491, 0.41, 1.08, 5200, 0, 0.001, 0.022],
      [ceramicTileFootstep, 1.047, 0.2802, 0.9, 0.96, 9600, 0, 0.001, 0.022],
      [sneakerPivotSqueak, 1.214, 0.22, 0.31, 0.9, 5800, 0, 0.001, 0.045],
      [ceramicTileFootstep, 1.385, 0.2587, 0.37, 1.04, 5100, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
