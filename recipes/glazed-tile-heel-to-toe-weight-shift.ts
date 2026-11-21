import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import ceramicTileFootstep from './_recordings/ceramic-tile-footstep.ts';

export default {
  id: 'glazed-tile-heel-to-toe-weight-shift', name: "Glazed tile heel to toe weight shift", category: 'Footsteps & UI',
  tags: ["ceramic", "tile", "indoor", "footstep", "walk", "step", "transfer", "stationary"],
  loopable: false, durationSec: 0.414, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(ceramicTileFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [ceramicTileFootstep, 0, 0.2773, 0.85, 0.97, 7800, 0, 0.001, 0.022],
      [ceramicTileFootstep, 0.148, 0.12, 0.34, 1.14, 4800, 0.042, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
