import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import mixedRubbleFootstep from './_recordings/mixed-rubble-footstep.ts';
import rockPileImpact from './_recordings/rock-pile-impact.ts';

export default {
  id: 'brick-rubble-drop-landing-and-recovery', name: "Brick rubble drop landing and recovery", category: 'Footsteps & UI',
  tags: ["brick", "rubble", "stones", "debris", "footstep", "drop", "heavy", "landing", "stumble"],
  loopable: false, durationSec: 1.036, mixRole: 'foley', targetRmsDbfs: -23,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, mixedRubbleFootstep, rockPileImpact),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.2, 0.22, 1.04, 5700, 0, 0.001, 0.022],
      [mixedRubbleFootstep, 0.061, 0.6035, 1, 0.86, 9600, 0, 0.001, 0.022],
      [mixedRubbleFootstep, 0.109, 0.5521, 0.78, 0.94, 9600, 0, 0.001, 0.022],
      [rockPileImpact, 0.177, 0.29, 0.31, 0.9, 7200, 0, 0.001, 0.045],
      [mixedRubbleFootstep, 0.469, 0.485, 0.31, 1.07, 5400, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
