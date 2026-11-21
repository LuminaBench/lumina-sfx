import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';
import packedSnowFootstep from './_recordings/packed-snow-footstep.ts';

export default {
  id: 'frozen-crust-drop-landing-and-recovery', name: "Frozen crust drop landing and recovery", category: 'Footsteps & UI',
  tags: ["ice", "brittle", "frozen", "snow", "footstep", "drop", "heavy", "landing", "stumble"],
  loopable: false, durationSec: 1.024, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, icyCrustFootstep, packedSnowFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.2, 0.22, 1.04, 5700, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.061, 0.6279, 1, 0.86, 9600, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.109, 0.5745, 0.78, 0.94, 9600, 0, 0.001, 0.022],
      [packedSnowFootstep, 0.177, 0.29, 0.31, 0.9, 7200, 0, 0.001, 0.045],
      [icyCrustFootstep, 0.469, 0.5047, 0.31, 1.07, 5400, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
