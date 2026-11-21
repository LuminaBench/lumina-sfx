import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalPuddles from './_recordings/natural-puddles.ts';
import shallowWaterFootstep from './_recordings/shallow-water-footstep.ts';

export default {
  id: 'shallow-puddles-drop-landing-and-recovery', name: "Shallow puddles drop landing and recovery", category: 'Footsteps & UI',
  tags: ["water", "wet", "splash", "puddle", "footstep", "drop", "heavy", "landing", "stumble"],
  loopable: false, durationSec: 1.308, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, naturalPuddles, shallowWaterFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.2, 0.22, 1.04, 5700, 0, 0.001, 0.022],
      [naturalPuddles, 0.061, 0.8547, 1, 0.86, 9600, 0, 0.001, 0.022],
      [naturalPuddles, 0.109, 0.7819, 0.78, 0.94, 9600, 0, 0.001, 0.022],
      [shallowWaterFootstep, 0.177, 0.29, 0.31, 0.9, 7200, 0, 0.001, 0.045],
      [naturalPuddles, 0.469, 0.6869, 0.31, 1.07, 5400, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
