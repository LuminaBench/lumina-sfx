import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalSnow from './_recordings/natural-snow.ts';
import naturalPlanks from './_recordings/natural-planks.ts';

export default {
  id: 'packed-snow-to-wood-planks-walking-transition', name: "Packed snow to wood planks walking transition", category: 'Footsteps & UI',
  tags: ["snow", "winter", "crunch", "boardwalk", "plank", "deck", "wooden", "footstep", "crossing", "threshold", "transition", "walk"],
  loopable: false, durationSec: 1.751, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalSnow, naturalPlanks),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalSnow, 0, 0.5061, 0.66, 0.99, 7200, 0, 0.001, 0.022],
      [naturalSnow, 0.465, 0.501, 0.78, 1, 10500, 0, 0.001, 0.022],
      [naturalPlanks, 0.94, 0.224, 1, 1, 10500, 0, 0.001, 0.022],
      [naturalPlanks, 1.424, 0.2133, 0.82, 1.05, 10500, 0, 0.001, 0.022],
    ], { taps: [0.024, 0.064], send: 0.125, dampingHz: 3300 });
  },
} satisfies SoundRecipe;
