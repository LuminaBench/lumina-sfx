import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import dryLeavesFootstep from './_recordings/dry-leaves-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import dryVineBrush from './_recordings/dry-vine-brush.ts';

export default {
  id: 'leaf-litter-stagger-and-catch', name: "Leaf litter stagger and catch", category: 'Footsteps & UI',
  tags: ["autumn", "forest", "dry", "leaves", "footstep", "stumble", "recovery", "trip"],
  loopable: false, durationSec: 1.231, mixRole: 'foley', targetRmsDbfs: -28,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(dryLeavesFootstep, jacketMovementRustle, dryVineBrush),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [dryLeavesFootstep, 0, 0.6528, 0.67, 1.08, 9600, 0, 0.001, 0.022],
      [dryLeavesFootstep, 0.146, 0.7421, 0.84, 0.95, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.229, 0.21, 0.19, 1.04, 5700, 0, 0.001, 0.022],
      [dryLeavesFootstep, 0.406, 0.7747, 1, 0.91, 9600, 0, 0.001, 0.022],
      [dryVineBrush, 0.536, 0.23, 0.18, 1.02, 5400, 0, 0.001, 0.045],
    ]);
  },
} satisfies SoundRecipe;
