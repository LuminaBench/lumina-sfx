import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import ceramicTileFootstep from './_recordings/ceramic-tile-footstep.ts';
import sneakerPivotSqueak from './_recordings/sneaker-pivot-squeak.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'glazed-tile-careful-toe-placement', name: "Glazed tile careful toe placement", category: 'Footsteps & UI',
  tags: ["ceramic", "tile", "indoor", "footstep", "sneak", "tiptoe", "quiet", "stealth"],
  loopable: false, durationSec: 0.401, mixRole: 'foley', targetRmsDbfs: -28,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(ceramicTileFootstep, sneakerPivotSqueak, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [ceramicTileFootstep, 0, 0.2, 0.7, 1.08, 5400, 0, 0.001, 0.022],
      [sneakerPivotSqueak, 0.104, 0.16, 0.1, 1.05, 3600, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.025, 0.21, 0.055, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
