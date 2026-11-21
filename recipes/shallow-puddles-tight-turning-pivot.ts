import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalPuddles from './_recordings/natural-puddles.ts';
import shallowWaterFootstep from './_recordings/shallow-water-footstep.ts';

export default {
  id: 'shallow-puddles-tight-turning-pivot', name: "Shallow puddles tight turning pivot", category: 'Footsteps & UI',
  tags: ["water", "wet", "splash", "puddle", "footstep", "pivot", "turn", "scrape"],
  loopable: false, durationSec: 1.157, mixRole: 'foley', targetRmsDbfs: -28,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalPuddles, shallowWaterFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalPuddles, 0, 0.22, 0.72, 1, 9600, 0, 0.001, 0.022],
      [shallowWaterFootstep, 0.069, 0.35, 0.59, 1.07, 7800, 0, 0.001, 0.045],
      [naturalPuddles, 0.331, 0.6743, 0.37, 1.09, 6100, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
