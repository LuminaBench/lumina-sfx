import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'frozen-crust-walk-into-a-jog', name: "Frozen crust walk into a jog", category: 'Footsteps & UI',
  tags: ["ice", "brittle", "frozen", "snow", "footstep", "walk", "jog", "accelerate", "gait"],
  loopable: false, durationSec: 2.28, mixRole: 'foley', targetRmsDbfs: -27,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(icyCrustFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [icyCrustFootstep, 0, 0.551, 0.71, 0.98, 9600, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.571, 0.5294, 0.74, 1.02, 9600, 0, 0.001, 0.022],
      [icyCrustFootstep, 1.04, 0.54, 0.82, 1, 9600, 0, 0.001, 0.022],
      [icyCrustFootstep, 1.402, 0.5094, 0.94, 1.06, 9600, 0, 0.001, 0.022],
      [icyCrustFootstep, 1.711, 0.5192, 1, 1.04, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 1.78, 0.21, 0.11, 1.04, 5700, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
