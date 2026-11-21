import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import mixedRubbleFootstep from './_recordings/mixed-rubble-footstep.ts';
import rockPileImpact from './_recordings/rock-pile-impact.ts';

export default {
  id: 'brick-rubble-tight-turning-pivot', name: "Brick rubble tight turning pivot", category: 'Footsteps & UI',
  tags: ["brick", "rubble", "stones", "debris", "footstep", "pivot", "turn", "scrape"],
  loopable: false, durationSec: 0.889, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(mixedRubbleFootstep, rockPileImpact),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [mixedRubbleFootstep, 0, 0.22, 0.72, 1, 9600, 0, 0.001, 0.022],
      [rockPileImpact, 0.069, 0.35, 0.59, 1.07, 7800, 0, 0.001, 0.045],
      [mixedRubbleFootstep, 0.331, 0.4761, 0.37, 1.09, 6100, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
