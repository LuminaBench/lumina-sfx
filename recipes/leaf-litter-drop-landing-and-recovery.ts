import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import dryLeavesFootstep from './_recordings/dry-leaves-footstep.ts';
import dryVineBrush from './_recordings/dry-vine-brush.ts';

export default {
  id: 'leaf-litter-drop-landing-and-recovery', name: "Leaf litter drop landing and recovery", category: 'Footsteps & UI',
  tags: ["autumn", "forest", "dry", "leaves", "footstep", "drop", "heavy", "landing", "stumble"],
  loopable: false, durationSec: 1.178, mixRole: 'foley', targetRmsDbfs: -27,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, dryLeavesFootstep, dryVineBrush),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.2, 0.22, 1.04, 5700, 0, 0.001, 0.022],
      [dryLeavesFootstep, 0.061, 0.8198, 1, 0.86, 9600, 0, 0.001, 0.022],
      [dryLeavesFootstep, 0.109, 0.75, 0.78, 0.94, 9600, 0, 0.001, 0.022],
      [dryVineBrush, 0.177, 0.29, 0.31, 0.9, 7200, 0, 0.001, 0.045],
      [dryLeavesFootstep, 0.469, 0.6589, 0.31, 1.07, 5400, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
