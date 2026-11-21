import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import dryLeavesFootstep from './_recordings/dry-leaves-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'leaf-litter-walk-into-a-jog', name: "Leaf litter walk into a jog", category: 'Footsteps & UI',
  tags: ["autumn", "forest", "dry", "leaves", "footstep", "walk", "jog", "accelerate", "gait"],
  loopable: false, durationSec: 2.439, mixRole: 'foley', targetRmsDbfs: -29,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(dryLeavesFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [dryLeavesFootstep, 0, 0.7194, 0.71, 0.98, 9600, 0, 0.001, 0.022],
      [dryLeavesFootstep, 0.571, 0.6912, 0.74, 1.02, 9600, 0, 0.001, 0.022],
      [dryLeavesFootstep, 1.04, 0.705, 0.82, 1, 9600, 0, 0.001, 0.022],
      [dryLeavesFootstep, 1.402, 0.6651, 0.94, 1.06, 9600, 0, 0.001, 0.022],
      [dryLeavesFootstep, 1.711, 0.6779, 1, 1.04, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 1.78, 0.21, 0.11, 1.04, 5700, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
