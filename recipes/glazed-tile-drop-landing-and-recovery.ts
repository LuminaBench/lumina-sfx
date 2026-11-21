import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import ceramicTileFootstep from './_recordings/ceramic-tile-footstep.ts';
import sneakerPivotSqueak from './_recordings/sneaker-pivot-squeak.ts';

export default {
  id: 'glazed-tile-drop-landing-and-recovery', name: "Glazed tile drop landing and recovery", category: 'Footsteps & UI',
  tags: ["ceramic", "tile", "indoor", "footstep", "drop", "heavy", "landing", "stumble"],
  loopable: false, durationSec: 0.857, mixRole: 'foley', targetRmsDbfs: -23,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, ceramicTileFootstep, sneakerPivotSqueak),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.2, 0.22, 1.04, 5700, 0, 0.001, 0.022],
      [ceramicTileFootstep, 0.061, 0.3128, 1, 0.86, 9600, 0, 0.001, 0.022],
      [ceramicTileFootstep, 0.109, 0.2862, 0.78, 0.94, 9600, 0, 0.001, 0.022],
      [sneakerPivotSqueak, 0.177, 0.29, 0.31, 0.9, 7200, 0, 0.001, 0.045],
      [ceramicTileFootstep, 0.469, 0.2514, 0.31, 1.07, 5400, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
