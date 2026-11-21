import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import mixedRubbleFootstep from './_recordings/mixed-rubble-footstep.ts';
import rockPileImpact from './_recordings/rock-pile-impact.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'brick-rubble-running-push-off', name: "Brick rubble running push off", category: 'Footsteps & UI',
  tags: ["brick", "rubble", "stones", "debris", "footstep", "jump", "takeoff", "toe", "burst"],
  loopable: false, durationSec: 0.383, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(mixedRubbleFootstep, rockPileImpact, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [mixedRubbleFootstep, 0, 0.17, 0.79, 1.11, 9600, 0, 0.001, 0.022],
      [rockPileImpact, 0.098, 0.19, 0.31, 1.23, 8100, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.091, 0.21, 0.14, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
