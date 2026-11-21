import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import ceramicTileFootstep from './_recordings/ceramic-tile-footstep.ts';
import sneakerPivotSqueak from './_recordings/sneaker-pivot-squeak.ts';

export default {
  id: 'glazed-tile-short-hop-landing', name: "Glazed tile short hop landing", category: 'Footsteps & UI',
  tags: ["ceramic", "tile", "indoor", "footstep", "jump", "landing", "hop"],
  loopable: false, durationSec: 0.504, mixRole: 'foley', targetRmsDbfs: -24,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, ceramicTileFootstep, sneakerPivotSqueak),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.14, 0.16, 1.04, 5700, 0, 0.001, 0.022],
      [ceramicTileFootstep, 0.084, 0.2745, 1, 0.98, 9600, 0, 0.001, 0.022],
      [ceramicTileFootstep, 0.118, 0.2491, 0.54, 1.08, 6200, 0, 0.001, 0.022],
      [sneakerPivotSqueak, 0.177, 0.18, 0.14, 1.1, 7500, 0, 0.001, 0.045],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
