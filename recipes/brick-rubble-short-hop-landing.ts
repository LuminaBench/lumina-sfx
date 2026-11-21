import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import mixedRubbleFootstep from './_recordings/mixed-rubble-footstep.ts';
import rockPileImpact from './_recordings/rock-pile-impact.ts';

export default {
  id: 'brick-rubble-short-hop-landing', name: "Brick rubble short hop landing", category: 'Footsteps & UI',
  tags: ["brick", "rubble", "stones", "debris", "footstep", "jump", "landing", "hop"],
  loopable: false, durationSec: 0.696, mixRole: 'foley', targetRmsDbfs: -24,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, mixedRubbleFootstep, rockPileImpact),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.14, 0.16, 1.04, 5700, 0, 0.001, 0.022],
      [mixedRubbleFootstep, 0.084, 0.5296, 1, 0.98, 9600, 0, 0.001, 0.022],
      [mixedRubbleFootstep, 0.118, 0.4806, 0.54, 1.08, 6200, 0, 0.001, 0.022],
      [rockPileImpact, 0.177, 0.18, 0.14, 1.1, 7500, 0, 0.001, 0.045],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
