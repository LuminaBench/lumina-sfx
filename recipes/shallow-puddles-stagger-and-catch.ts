import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalPuddles from './_recordings/natural-puddles.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import shallowWaterFootstep from './_recordings/shallow-water-footstep.ts';

export default {
  id: 'shallow-puddles-stagger-and-catch', name: "Shallow puddles stagger and catch", category: 'Footsteps & UI',
  tags: ["water", "wet", "splash", "puddle", "footstep", "stumble", "recovery", "trip"],
  loopable: false, durationSec: 1.366, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalPuddles, jacketMovementRustle, shallowWaterFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalPuddles, 0, 0.6806, 0.67, 1.08, 9600, 0, 0.001, 0.022],
      [naturalPuddles, 0.146, 0.7737, 0.84, 0.95, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.229, 0.21, 0.19, 1.04, 5700, 0, 0.001, 0.022],
      [naturalPuddles, 0.406, 0.8077, 1, 0.91, 9600, 0, 0.001, 0.022],
      [shallowWaterFootstep, 0.536, 0.23, 0.18, 1.02, 5400, 0, 0.001, 0.045],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
