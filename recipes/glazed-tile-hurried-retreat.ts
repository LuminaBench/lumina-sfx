import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import ceramicTileFootstep from './_recordings/ceramic-tile-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'glazed-tile-hurried-retreat', name: "Glazed tile hurried retreat", category: 'Footsteps & UI',
  tags: ["ceramic", "tile", "indoor", "footstep", "retreat", "run", "recede", "escape"],
  loopable: false, durationSec: 1.686, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(ceramicTileFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [ceramicTileFootstep, 0, 0.2538, 1, 1.06, 9600, 0, 0.001, 0.022],
      [ceramicTileFootstep, 0.238, 0.2587, 0.79, 1.04, 7400, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.327, 0.21, 0.14, 1.04, 5700, 0, 0.001, 0.022],
      [ceramicTileFootstep, 0.557, 0.2468, 0.54, 1.09, 5500, 0, 0.001, 0.022],
      [ceramicTileFootstep, 0.902, 0.2587, 0.32, 1.04, 3700, 0, 0.001, 0.022],
      [ceramicTileFootstep, 1.285, 0.2637, 0.17, 1.02, 2400, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
