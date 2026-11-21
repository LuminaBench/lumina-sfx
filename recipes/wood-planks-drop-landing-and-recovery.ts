import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalPlanks from './_recordings/natural-planks.ts';
import barnTimberCreak from './_recordings/barn-timber-creak.ts';

export default {
  id: 'wood-planks-drop-landing-and-recovery', name: "Wood planks drop landing and recovery", category: 'Footsteps & UI',
  tags: ["boardwalk", "plank", "deck", "wooden", "footstep", "drop", "heavy", "landing", "stumble"],
  loopable: false, durationSec: 0.792, mixRole: 'foley', targetRmsDbfs: -23,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, naturalPlanks, barnTimberCreak),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.2, 0.22, 1.04, 5700, 0, 0.001, 0.022],
      [naturalPlanks, 0.061, 0.2605, 1, 0.86, 9600, 0, 0.001, 0.022],
      [naturalPlanks, 0.109, 0.2383, 0.78, 0.94, 9600, 0, 0.001, 0.022],
      [barnTimberCreak, 0.177, 0.29, 0.31, 0.9, 7200, 0, 0.001, 0.045],
      [naturalPlanks, 0.469, 0.2093, 0.31, 1.07, 5400, 0, 0.001, 0.022],
    ], { taps: [0.024, 0.064], send: 0.125, dampingHz: 3300 });
  },
} satisfies SoundRecipe;
