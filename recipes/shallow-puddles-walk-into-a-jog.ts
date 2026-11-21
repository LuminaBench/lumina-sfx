import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalPuddles from './_recordings/natural-puddles.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'shallow-puddles-walk-into-a-jog', name: "Shallow puddles walk into a jog", category: 'Footsteps & UI',
  tags: ["water", "wet", "splash", "puddle", "footstep", "walk", "jog", "accelerate", "gait"],
  loopable: false, durationSec: 2.57, mixRole: 'foley', targetRmsDbfs: -27,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalPuddles, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalPuddles, 0, 0.75, 0.71, 0.98, 9600, 0, 0.001, 0.022],
      [naturalPuddles, 0.571, 0.7206, 0.74, 1.02, 9600, 0, 0.001, 0.022],
      [naturalPuddles, 1.04, 0.735, 0.82, 1, 9600, 0, 0.001, 0.022],
      [naturalPuddles, 1.402, 0.6934, 0.94, 1.06, 9600, 0, 0.001, 0.022],
      [naturalPuddles, 1.711, 0.7067, 1, 1.04, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 1.78, 0.21, 0.11, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
