import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import mixedRubbleFootstep from './_recordings/mixed-rubble-footstep.ts';

export default {
  id: 'brick-rubble-heel-to-toe-weight-shift', name: "Brick rubble heel to toe weight shift", category: 'Footsteps & UI',
  tags: ["brick", "rubble", "stones", "debris", "footstep", "walk", "step", "transfer", "stationary"],
  loopable: false, durationSec: 0.617, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(mixedRubbleFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [mixedRubbleFootstep, 0, 0.5351, 0.85, 0.97, 7800, 0, 0.001, 0.022],
      [mixedRubbleFootstep, 0.148, 0.12, 0.34, 1.14, 4800, 0.042, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
