import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalPlanks from './_recordings/natural-planks.ts';
import naturalSnow from './_recordings/natural-snow.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';

export default {
  id: 'wood-planks-to-packed-snow-walking-transition', name: "Wood planks to packed snow walking transition", category: 'Footsteps & UI',
  tags: ["boardwalk", "plank", "deck", "wooden", "snow", "winter", "crunch", "footstep", "crossing", "threshold", "transition", "walk"],
  loopable: false, durationSec: 1.951, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalPlanks, naturalSnow, icyCrustFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalPlanks, 0, 0.2263, 0.66, 0.99, 7200, 0, 0.001, 0.022],
      [naturalPlanks, 0.465, 0.224, 0.78, 1, 10500, 0, 0.001, 0.022],
      [naturalSnow, 0.94, 0.501, 1, 1, 10500, 0, 0.001, 0.022],
      [icyCrustFootstep, 1.04, 0.16, 0.1, 1.07, 5900, 0, 0.001, 0.022],
      [naturalSnow, 1.424, 0.4771, 0.82, 1.05, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
