import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';
import packedSnowFootstep from './_recordings/packed-snow-footstep.ts';

export default {
  id: 'frozen-crust-tight-turning-pivot', name: "Frozen crust tight turning pivot", category: 'Footsteps & UI',
  tags: ["ice", "brittle", "frozen", "snow", "footstep", "pivot", "turn", "scrape"],
  loopable: false, durationSec: 0.876, mixRole: 'foley', targetRmsDbfs: -28,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(icyCrustFootstep, packedSnowFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [icyCrustFootstep, 0, 0.22, 0.72, 1, 9600, 0, 0.001, 0.022],
      [packedSnowFootstep, 0.069, 0.35, 0.59, 1.07, 7800, 0, 0.001, 0.045],
      [icyCrustFootstep, 0.331, 0.4954, 0.37, 1.09, 6100, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
