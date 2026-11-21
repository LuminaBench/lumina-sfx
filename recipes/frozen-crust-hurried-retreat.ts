import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'frozen-crust-hurried-retreat', name: "Frozen crust hurried retreat", category: 'Footsteps & UI',
  tags: ["ice", "brittle", "frozen", "snow", "footstep", "retreat", "run", "recede", "escape"],
  loopable: false, durationSec: 1.864, mixRole: 'foley', targetRmsDbfs: -27,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(icyCrustFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [icyCrustFootstep, 0, 0.5094, 1, 1.06, 9600, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.238, 0.5192, 0.79, 1.04, 7400, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.327, 0.21, 0.14, 1.04, 5700, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.557, 0.4954, 0.54, 1.09, 5500, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.902, 0.5192, 0.32, 1.04, 3700, 0, 0.001, 0.022],
      [icyCrustFootstep, 1.285, 0.5294, 0.17, 1.02, 2400, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
