import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalPlanks from './_recordings/natural-planks.ts';
import barnTimberCreak from './_recordings/barn-timber-creak.ts';

export default {
  id: 'wood-planks-limping-gait', name: "Wood planks limping gait", category: 'Footsteps & UI',
  tags: ["boardwalk", "plank", "deck", "wooden", "footstep", "injured", "limp", "irregular", "walk", "cycle"],
  loopable: false, durationSec: 1.714, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalPlanks, barnTimberCreak),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalPlanks, 0, 0.2409, 1, 0.93, 9600, 0, 0.001, 0.022],
      [barnTimberCreak, 0.168, 0.27, 0.35, 0.86, 5600, 0, 0.001, 0.045],
      [naturalPlanks, 0.346, 0.2074, 0.41, 1.08, 5200, 0, 0.001, 0.022],
      [naturalPlanks, 1.047, 0.2333, 0.9, 0.96, 9600, 0, 0.001, 0.022],
      [barnTimberCreak, 1.214, 0.22, 0.31, 0.9, 5800, 0, 0.001, 0.045],
      [naturalPlanks, 1.385, 0.2154, 0.37, 1.04, 5100, 0, 0.001, 0.022],
    ], { taps: [0.024, 0.064], send: 0.125, dampingHz: 3300 });
  },
} satisfies SoundRecipe;
