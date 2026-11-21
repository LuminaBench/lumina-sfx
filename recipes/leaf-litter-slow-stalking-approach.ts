import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import dryLeavesFootstep from './_recordings/dry-leaves-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import dryVineBrush from './_recordings/dry-vine-brush.ts';

export default {
  id: 'leaf-litter-slow-stalking-approach', name: "Leaf litter slow stalking approach", category: 'Footsteps & UI',
  tags: ["autumn", "forest", "dry", "leaves", "footstep", "stealth", "approach", "sneak", "sequence"],
  loopable: false, durationSec: 2.363, mixRole: 'foley', targetRmsDbfs: -31,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(dryLeavesFootstep, jacketMovementRustle, dryVineBrush),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [dryLeavesFootstep, 0, 0.705, 0.44, 1, 3600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.49, 0.21, 0.065, 1.04, 5700, 0, 0.001, 0.022],
      [dryLeavesFootstep, 0.744, 0.6779, 0.64, 1.04, 4600, 0, 0.001, 0.022],
      [dryLeavesFootstep, 1.601, 0.7121, 0.86, 0.99, 6100, 0, 0.001, 0.022],
      [dryVineBrush, 1.746, 0.17, 0.11, 1.1, 4500, 0, 0.001, 0.045],
    ]);
  },
} satisfies SoundRecipe;
