import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import dryLeavesFootstep from './_recordings/dry-leaves-footstep.ts';

export default {
  id: 'leaf-litter-heel-to-toe-weight-shift', name: "Leaf litter heel to toe weight shift", category: 'Footsteps & UI',
  tags: ["autumn", "forest", "dry", "leaves", "footstep", "walk", "step", "transfer", "stationary"],
  loopable: false, durationSec: 0.777, mixRole: 'foley', targetRmsDbfs: -29,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(dryLeavesFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [dryLeavesFootstep, 0, 0.7268, 0.85, 0.97, 7800, 0, 0.001, 0.022],
      [dryLeavesFootstep, 0.148, 0.12, 0.34, 1.14, 4800, 0.042, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
