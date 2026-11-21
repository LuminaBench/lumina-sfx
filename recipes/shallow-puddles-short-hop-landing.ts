import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalPuddles from './_recordings/natural-puddles.ts';
import shallowWaterFootstep from './_recordings/shallow-water-footstep.ts';

export default {
  id: 'shallow-puddles-short-hop-landing', name: "Shallow puddles short hop landing", category: 'Footsteps & UI',
  tags: ["water", "wet", "splash", "puddle", "footstep", "jump", "landing", "hop"],
  loopable: false, durationSec: 0.986, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, naturalPuddles, shallowWaterFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.14, 0.16, 1.04, 5700, 0, 0.001, 0.022],
      [naturalPuddles, 0.084, 0.75, 1, 0.98, 9600, 0, 0.001, 0.022],
      [naturalPuddles, 0.118, 0.6806, 0.54, 1.08, 6200, 0, 0.001, 0.022],
      [shallowWaterFootstep, 0.177, 0.18, 0.14, 1.1, 7500, 0, 0.001, 0.045],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
