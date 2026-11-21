import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import dryLeavesFootstep from './_recordings/dry-leaves-footstep.ts';
import dryVineBrush from './_recordings/dry-vine-brush.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'leaf-litter-braking-skid-to-a-stop', name: "Leaf litter braking skid to a stop", category: 'Footsteps & UI',
  tags: ["autumn", "forest", "dry", "leaves", "footstep", "stop", "sprint", "brake", "scuff"],
  loopable: false, durationSec: 1.003, mixRole: 'foley', targetRmsDbfs: -28,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(dryLeavesFootstep, dryVineBrush, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [dryLeavesFootstep, 0, 0.22, 0.81, 1.1, 9600, 0, 0.001, 0.022],
      [dryLeavesFootstep, 0.203, 0.75, 0.95, 0.94, 9600, 0, 0.001, 0.022],
      [dryVineBrush, 0.246, 0.44, 0.64, 0.82, 8800, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.287, 0.21, 0.12, 1.04, 5700, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
