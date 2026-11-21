import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import mixedRubbleFootstep from './_recordings/mixed-rubble-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import rockPileImpact from './_recordings/rock-pile-impact.ts';

export default {
  id: 'brick-rubble-slow-stalking-approach', name: "Brick rubble slow stalking approach", category: 'Footsteps & UI',
  tags: ["brick", "rubble", "stones", "debris", "footstep", "stealth", "approach", "sneak", "sequence"],
  loopable: false, durationSec: 2.207, mixRole: 'foley', targetRmsDbfs: -27,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(mixedRubbleFootstep, jacketMovementRustle, rockPileImpact),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [mixedRubbleFootstep, 0, 0.519, 0.44, 1, 3600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.49, 0.21, 0.065, 1.04, 5700, 0, 0.001, 0.022],
      [mixedRubbleFootstep, 0.744, 0.499, 0.64, 1.04, 4600, 0, 0.001, 0.022],
      [mixedRubbleFootstep, 1.601, 0.5242, 0.86, 0.99, 6100, 0, 0.001, 0.022],
      [rockPileImpact, 1.746, 0.17, 0.11, 1.1, 4500, 0, 0.001, 0.045],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
