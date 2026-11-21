import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalSnow from './_recordings/natural-snow.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';

export default {
  id: 'packed-snow-tight-turning-pivot', name: "Packed snow tight turning pivot", category: 'Footsteps & UI',
  tags: ["snow", "winter", "crunch", "footstep", "pivot", "turn", "scrape"],
  loopable: false, durationSec: 0.841, mixRole: 'foley', targetRmsDbfs: -29,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalSnow, icyCrustFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalSnow, 0, 0.22, 0.72, 1, 9600, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.069, 0.35, 0.59, 1.07, 7800, 0, 0.001, 0.045],
      [naturalSnow, 0.331, 0.4596, 0.37, 1.09, 6100, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
