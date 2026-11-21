import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import packedSnowFootstep from './_recordings/packed-snow-footstep.ts';

export default {
  id: 'frozen-crust-slow-stalking-approach', name: "Frozen crust slow stalking approach", category: 'Footsteps & UI',
  tags: ["ice", "brittle", "frozen", "snow", "footstep", "stealth", "approach", "sneak", "sequence"],
  loopable: false, durationSec: 2.196, mixRole: 'foley', targetRmsDbfs: -29,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(icyCrustFootstep, jacketMovementRustle, packedSnowFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [icyCrustFootstep, 0, 0.54, 0.44, 1, 3600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.49, 0.21, 0.065, 1.04, 5700, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.744, 0.5192, 0.64, 1.04, 4600, 0, 0.001, 0.022],
      [icyCrustFootstep, 1.601, 0.5455, 0.86, 0.99, 6100, 0, 0.001, 0.022],
      [packedSnowFootstep, 1.746, 0.17, 0.11, 1.1, 4500, 0, 0.001, 0.045],
    ]);
  },
} satisfies SoundRecipe;
