import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import dryLeavesFootstep from './_recordings/dry-leaves-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'leaf-litter-hurried-retreat', name: "Leaf litter hurried retreat", category: 'Footsteps & UI',
  tags: ["autumn", "forest", "dry", "leaves", "footstep", "retreat", "run", "recede", "escape"],
  loopable: false, durationSec: 2.026, mixRole: 'foley', targetRmsDbfs: -29,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(dryLeavesFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [dryLeavesFootstep, 0, 0.6651, 1, 1.06, 9600, 0, 0.001, 0.022],
      [dryLeavesFootstep, 0.238, 0.6779, 0.79, 1.04, 7400, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.327, 0.21, 0.14, 1.04, 5700, 0, 0.001, 0.022],
      [dryLeavesFootstep, 0.557, 0.6468, 0.54, 1.09, 5500, 0, 0.001, 0.022],
      [dryLeavesFootstep, 0.902, 0.6779, 0.32, 1.04, 3700, 0, 0.001, 0.022],
      [dryLeavesFootstep, 1.285, 0.6912, 0.17, 1.02, 2400, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
