import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import dryLeavesFootstep from './_recordings/dry-leaves-footstep.ts';
import dryVineBrush from './_recordings/dry-vine-brush.ts';

export default {
  id: 'leaf-litter-limping-gait', name: "Leaf litter limping gait", category: 'Footsteps & UI',
  tags: ["autumn", "forest", "dry", "leaves", "footstep", "injured", "limp", "irregular", "walk", "cycle"],
  loopable: false, durationSec: 2.113, mixRole: 'foley', targetRmsDbfs: -30,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(dryLeavesFootstep, dryVineBrush),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [dryLeavesFootstep, 0, 0.7581, 1, 0.93, 9600, 0, 0.001, 0.022],
      [dryVineBrush, 0.168, 0.27, 0.35, 0.86, 5600, 0, 0.001, 0.045],
      [dryLeavesFootstep, 0.346, 0.6528, 0.41, 1.08, 5200, 0, 0.001, 0.022],
      [dryLeavesFootstep, 1.047, 0.7344, 0.9, 0.96, 9600, 0, 0.001, 0.022],
      [dryVineBrush, 1.214, 0.22, 0.31, 0.9, 5800, 0, 0.001, 0.045],
      [dryLeavesFootstep, 1.385, 0.6779, 0.37, 1.04, 5100, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
