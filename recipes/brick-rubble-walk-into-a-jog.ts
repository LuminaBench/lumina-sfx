import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import mixedRubbleFootstep from './_recordings/mixed-rubble-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'brick-rubble-walk-into-a-jog', name: "Brick rubble walk into a jog", category: 'Footsteps & UI',
  tags: ["brick", "rubble", "stones", "debris", "footstep", "walk", "jog", "accelerate", "gait"],
  loopable: false, durationSec: 2.292, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(mixedRubbleFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [mixedRubbleFootstep, 0, 0.5296, 0.71, 0.98, 9600, 0, 0.001, 0.022],
      [mixedRubbleFootstep, 0.571, 0.5088, 0.74, 1.02, 9600, 0, 0.001, 0.022],
      [mixedRubbleFootstep, 1.04, 0.519, 0.82, 1, 9600, 0, 0.001, 0.022],
      [mixedRubbleFootstep, 1.402, 0.4896, 0.94, 1.06, 9600, 0, 0.001, 0.022],
      [mixedRubbleFootstep, 1.711, 0.499, 1, 1.04, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 1.78, 0.21, 0.11, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
