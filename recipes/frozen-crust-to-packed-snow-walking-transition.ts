import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';
import naturalSnow from './_recordings/natural-snow.ts';

export default {
  id: 'frozen-crust-to-packed-snow-walking-transition', name: "Frozen crust to packed snow walking transition", category: 'Footsteps & UI',
  tags: ["ice", "brittle", "frozen", "snow", "winter", "crunch", "footstep", "crossing", "threshold", "transition", "walk"],
  loopable: false, durationSec: 1.951, mixRole: 'foley', targetRmsDbfs: -28,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(icyCrustFootstep, naturalSnow),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [icyCrustFootstep, 0, 0.5455, 0.66, 0.99, 7200, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.465, 0.54, 0.78, 1, 10500, 0, 0.001, 0.022],
      [naturalSnow, 0.94, 0.501, 1, 1, 10500, 0, 0.001, 0.022],
      [icyCrustFootstep, 1.04, 0.16, 0.1, 1.07, 5900, 0, 0.001, 0.022],
      [naturalSnow, 1.424, 0.4771, 0.82, 1.05, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
