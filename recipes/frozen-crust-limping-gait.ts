import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';
import packedSnowFootstep from './_recordings/packed-snow-footstep.ts';

export default {
  id: 'frozen-crust-limping-gait', name: "Frozen crust limping gait", category: 'Footsteps & UI',
  tags: ["ice", "brittle", "frozen", "snow", "footstep", "injured", "limp", "irregular", "walk", "cycle"],
  loopable: false, durationSec: 1.954, mixRole: 'foley', targetRmsDbfs: -28,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(icyCrustFootstep, packedSnowFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [icyCrustFootstep, 0, 0.5806, 1, 0.93, 9600, 0, 0.001, 0.022],
      [packedSnowFootstep, 0.168, 0.27, 0.35, 0.86, 5600, 0, 0.001, 0.045],
      [icyCrustFootstep, 0.346, 0.5, 0.41, 1.08, 5200, 0, 0.001, 0.022],
      [icyCrustFootstep, 1.047, 0.5625, 0.9, 0.96, 9600, 0, 0.001, 0.022],
      [packedSnowFootstep, 1.214, 0.22, 0.31, 0.9, 5800, 0, 0.001, 0.045],
      [icyCrustFootstep, 1.385, 0.5192, 0.37, 1.04, 5100, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
