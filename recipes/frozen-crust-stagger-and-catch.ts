import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import packedSnowFootstep from './_recordings/packed-snow-footstep.ts';

export default {
  id: 'frozen-crust-stagger-and-catch', name: "Frozen crust stagger and catch", category: 'Footsteps & UI',
  tags: ["ice", "brittle", "frozen", "snow", "footstep", "stumble", "recovery", "trip"],
  loopable: false, durationSec: 1.049, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(icyCrustFootstep, jacketMovementRustle, packedSnowFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [icyCrustFootstep, 0, 0.5, 0.67, 1.08, 9600, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.146, 0.5684, 0.84, 0.95, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.229, 0.21, 0.19, 1.04, 5700, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.406, 0.5934, 1, 0.91, 9600, 0, 0.001, 0.022],
      [packedSnowFootstep, 0.536, 0.23, 0.18, 1.02, 5400, 0, 0.001, 0.045],
    ]);
  },
} satisfies SoundRecipe;
