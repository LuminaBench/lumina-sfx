import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import ceramicTileFootstep from './_recordings/ceramic-tile-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'glazed-tile-walk-into-a-jog', name: "Glazed tile walk into a jog", category: 'Footsteps & UI',
  tags: ["ceramic", "tile", "indoor", "footstep", "walk", "jog", "accelerate", "gait"],
  loopable: false, durationSec: 2.127, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(ceramicTileFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [ceramicTileFootstep, 0, 0.2745, 0.71, 0.98, 9600, 0, 0.001, 0.022],
      [ceramicTileFootstep, 0.571, 0.2637, 0.74, 1.02, 9600, 0, 0.001, 0.022],
      [ceramicTileFootstep, 1.04, 0.269, 0.82, 1, 9600, 0, 0.001, 0.022],
      [ceramicTileFootstep, 1.402, 0.2538, 0.94, 1.06, 9600, 0, 0.001, 0.022],
      [ceramicTileFootstep, 1.711, 0.2587, 1, 1.04, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 1.78, 0.21, 0.11, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
