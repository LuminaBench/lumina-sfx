import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';
import packedSnowFootstep from './_recordings/packed-snow-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'frozen-crust-braking-skid-to-a-stop', name: "Frozen crust braking skid to a stop", category: 'Footsteps & UI',
  tags: ["ice", "brittle", "frozen", "snow", "footstep", "stop", "sprint", "brake", "scuff"],
  loopable: false, durationSec: 0.828, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(icyCrustFootstep, packedSnowFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [icyCrustFootstep, 0, 0.22, 0.81, 1.1, 9600, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.203, 0.5745, 0.95, 0.94, 9600, 0, 0.001, 0.022],
      [packedSnowFootstep, 0.246, 0.44, 0.64, 0.82, 8800, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.287, 0.21, 0.12, 1.04, 5700, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
