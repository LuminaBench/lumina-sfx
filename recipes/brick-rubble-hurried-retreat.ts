import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import mixedRubbleFootstep from './_recordings/mixed-rubble-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'brick-rubble-hurried-retreat', name: "Brick rubble hurried retreat", category: 'Footsteps & UI',
  tags: ["brick", "rubble", "stones", "debris", "footstep", "retreat", "run", "recede", "escape"],
  loopable: false, durationSec: 1.876, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(mixedRubbleFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [mixedRubbleFootstep, 0, 0.4896, 1, 1.06, 9600, 0, 0.001, 0.022],
      [mixedRubbleFootstep, 0.238, 0.499, 0.79, 1.04, 7400, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.327, 0.21, 0.14, 1.04, 5700, 0, 0.001, 0.022],
      [mixedRubbleFootstep, 0.557, 0.4761, 0.54, 1.09, 5500, 0, 0.001, 0.022],
      [mixedRubbleFootstep, 0.902, 0.499, 0.32, 1.04, 3700, 0, 0.001, 0.022],
      [mixedRubbleFootstep, 1.285, 0.5088, 0.17, 1.02, 2400, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
