import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';
import packedSnowFootstep from './_recordings/packed-snow-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'frozen-crust-running-push-off', name: "Frozen crust running push off", category: 'Footsteps & UI',
  tags: ["ice", "brittle", "frozen", "snow", "footstep", "jump", "takeoff", "toe", "burst"],
  loopable: false, durationSec: 0.351, mixRole: 'foley', targetRmsDbfs: -27,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(icyCrustFootstep, packedSnowFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [icyCrustFootstep, 0, 0.17, 0.79, 1.11, 9600, 0, 0.001, 0.022],
      [packedSnowFootstep, 0.098, 0.19, 0.31, 1.23, 8100, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.091, 0.21, 0.14, 1.04, 5700, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
