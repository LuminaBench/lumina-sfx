import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalPlanks from './_recordings/natural-planks.ts';
import barnTimberCreak from './_recordings/barn-timber-creak.ts';

export default {
  id: 'wood-planks-short-hop-landing', name: "Wood planks short hop landing", category: 'Footsteps & UI',
  tags: ["boardwalk", "plank", "deck", "wooden", "footstep", "jump", "landing", "hop"],
  loopable: false, durationSec: 0.471, mixRole: 'foley', targetRmsDbfs: -24,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, naturalPlanks, barnTimberCreak),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.14, 0.16, 1.04, 5700, 0, 0.001, 0.022],
      [naturalPlanks, 0.084, 0.2286, 1, 0.98, 9600, 0, 0.001, 0.022],
      [naturalPlanks, 0.118, 0.2074, 0.54, 1.08, 6200, 0, 0.001, 0.022],
      [barnTimberCreak, 0.177, 0.18, 0.14, 1.1, 7500, 0, 0.001, 0.045],
    ], { taps: [0.024, 0.064], send: 0.125, dampingHz: 3300 });
  },
} satisfies SoundRecipe;
