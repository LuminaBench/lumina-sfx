import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalAsphalt from './_recordings/natural-asphalt.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'wet-asphalt-walk-into-a-jog', name: "Wet asphalt walk into a jog", category: 'Footsteps & UI',
  tags: ["rain", "street", "pavement", "footstep", "walk", "jog", "accelerate", "gait"],
  loopable: false, durationSec: 2.176, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalAsphalt, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalAsphalt, 0, 0.3316, 0.71, 0.98, 9600, 0, 0.001, 0.022],
      [naturalAsphalt, 0.571, 0.3186, 0.74, 1.02, 9600, 0, 0.001, 0.022],
      [naturalAsphalt, 1.04, 0.325, 0.82, 1, 9600, 0, 0.001, 0.022],
      [naturalAsphalt, 1.402, 0.3066, 0.94, 1.06, 9600, 0, 0.001, 0.022],
      [naturalAsphalt, 1.711, 0.3125, 1, 1.04, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 1.78, 0.21, 0.11, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
