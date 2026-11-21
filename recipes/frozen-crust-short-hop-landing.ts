import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';
import packedSnowFootstep from './_recordings/packed-snow-footstep.ts';

export default {
  id: 'frozen-crust-short-hop-landing', name: "Frozen crust short hop landing", category: 'Footsteps & UI',
  tags: ["ice", "brittle", "frozen", "snow", "footstep", "jump", "landing", "hop"],
  loopable: false, durationSec: 0.685, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, icyCrustFootstep, packedSnowFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.14, 0.16, 1.04, 5700, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.084, 0.551, 1, 0.98, 9600, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.118, 0.5, 0.54, 1.08, 6200, 0, 0.001, 0.022],
      [packedSnowFootstep, 0.177, 0.18, 0.14, 1.1, 7500, 0, 0.001, 0.045],
    ]);
  },
} satisfies SoundRecipe;
