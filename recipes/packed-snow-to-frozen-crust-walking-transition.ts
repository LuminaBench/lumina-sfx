import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalSnow from './_recordings/natural-snow.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';
import packedSnowFootstep from './_recordings/packed-snow-footstep.ts';

export default {
  id: 'packed-snow-to-frozen-crust-walking-transition', name: "Packed snow to frozen crust walking transition", category: 'Footsteps & UI',
  tags: ["snow", "winter", "crunch", "ice", "brittle", "frozen", "footstep", "crossing", "threshold", "transition", "walk"],
  loopable: false, durationSec: 1.988, mixRole: 'foley', targetRmsDbfs: -28,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalSnow, icyCrustFootstep, packedSnowFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalSnow, 0, 0.5061, 0.66, 0.99, 7200, 0, 0.001, 0.022],
      [naturalSnow, 0.465, 0.501, 0.78, 1, 10500, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.94, 0.54, 1, 1, 10500, 0, 0.001, 0.022],
      [packedSnowFootstep, 1.04, 0.16, 0.1, 1.07, 5900, 0, 0.001, 0.022],
      [icyCrustFootstep, 1.424, 0.5143, 0.82, 1.05, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
