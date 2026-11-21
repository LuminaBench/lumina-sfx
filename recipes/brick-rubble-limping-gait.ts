import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import mixedRubbleFootstep from './_recordings/mixed-rubble-footstep.ts';
import rockPileImpact from './_recordings/rock-pile-impact.ts';

export default {
  id: 'brick-rubble-limping-gait', name: "Brick rubble limping gait", category: 'Footsteps & UI',
  tags: ["brick", "rubble", "stones", "debris", "footstep", "injured", "limp", "irregular", "walk", "cycle"],
  loopable: false, durationSec: 1.966, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(mixedRubbleFootstep, rockPileImpact),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [mixedRubbleFootstep, 0, 0.5581, 1, 0.93, 9600, 0, 0.001, 0.022],
      [rockPileImpact, 0.168, 0.27, 0.35, 0.86, 5600, 0, 0.001, 0.045],
      [mixedRubbleFootstep, 0.346, 0.4806, 0.41, 1.08, 5200, 0, 0.001, 0.022],
      [mixedRubbleFootstep, 1.047, 0.5406, 0.9, 0.96, 9600, 0, 0.001, 0.022],
      [rockPileImpact, 1.214, 0.22, 0.31, 0.9, 5800, 0, 0.001, 0.045],
      [mixedRubbleFootstep, 1.385, 0.499, 0.37, 1.04, 5100, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
