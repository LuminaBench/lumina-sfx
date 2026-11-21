import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import dryLeavesFootstep from './_recordings/dry-leaves-footstep.ts';
import dryVineBrush from './_recordings/dry-vine-brush.ts';

export default {
  id: 'leaf-litter-tight-turning-pivot', name: "Leaf litter tight turning pivot", category: 'Footsteps & UI',
  tags: ["autumn", "forest", "dry", "leaves", "footstep", "pivot", "turn", "scrape"],
  loopable: false, durationSec: 1.028, mixRole: 'foley', targetRmsDbfs: -30,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(dryLeavesFootstep, dryVineBrush),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [dryLeavesFootstep, 0, 0.22, 0.72, 1, 9600, 0, 0.001, 0.022],
      [dryVineBrush, 0.069, 0.35, 0.59, 1.07, 7800, 0, 0.001, 0.045],
      [dryLeavesFootstep, 0.331, 0.6468, 0.37, 1.09, 6100, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
