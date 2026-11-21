import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalPuddles from './_recordings/natural-puddles.ts';
import shallowWaterFootstep from './_recordings/shallow-water-footstep.ts';

export default {
  id: 'shallow-puddles-limping-gait', name: "Shallow puddles limping gait", category: 'Footsteps & UI',
  tags: ["water", "wet", "splash", "puddle", "footstep", "injured", "limp", "irregular", "walk", "cycle"],
  loopable: false, durationSec: 2.244, mixRole: 'foley', targetRmsDbfs: -28,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalPuddles, shallowWaterFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalPuddles, 0, 0.7903, 1, 0.93, 9600, 0, 0.001, 0.022],
      [shallowWaterFootstep, 0.168, 0.27, 0.35, 0.86, 5600, 0, 0.001, 0.045],
      [naturalPuddles, 0.346, 0.6806, 0.41, 1.08, 5200, 0, 0.001, 0.022],
      [naturalPuddles, 1.047, 0.7656, 0.9, 0.96, 9600, 0, 0.001, 0.022],
      [shallowWaterFootstep, 1.214, 0.22, 0.31, 0.9, 5800, 0, 0.001, 0.045],
      [naturalPuddles, 1.385, 0.7067, 0.37, 1.04, 5100, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
