import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import dryLeavesFootstep from './_recordings/dry-leaves-footstep.ts';
import dryVineBrush from './_recordings/dry-vine-brush.ts';

export default {
  id: 'leaf-litter-short-hop-landing', name: "Leaf litter short hop landing", category: 'Footsteps & UI',
  tags: ["autumn", "forest", "dry", "leaves", "footstep", "jump", "landing", "hop"],
  loopable: false, durationSec: 0.853, mixRole: 'foley', targetRmsDbfs: -28,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, dryLeavesFootstep, dryVineBrush),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.14, 0.16, 1.04, 5700, 0, 0.001, 0.022],
      [dryLeavesFootstep, 0.084, 0.7194, 1, 0.98, 9600, 0, 0.001, 0.022],
      [dryLeavesFootstep, 0.118, 0.6528, 0.54, 1.08, 6200, 0, 0.001, 0.022],
      [dryVineBrush, 0.177, 0.18, 0.14, 1.1, 7500, 0, 0.001, 0.045],
    ]);
  },
} satisfies SoundRecipe;
