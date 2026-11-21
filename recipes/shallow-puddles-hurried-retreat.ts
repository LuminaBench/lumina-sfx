import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalPuddles from './_recordings/natural-puddles.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'shallow-puddles-hurried-retreat', name: "Shallow puddles hurried retreat", category: 'Footsteps & UI',
  tags: ["water", "wet", "splash", "puddle", "footstep", "retreat", "run", "recede", "escape"],
  loopable: false, durationSec: 2.158, mixRole: 'foley', targetRmsDbfs: -27,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalPuddles, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalPuddles, 0, 0.6934, 1, 1.06, 9600, 0, 0.001, 0.022],
      [naturalPuddles, 0.238, 0.7067, 0.79, 1.04, 7400, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.327, 0.21, 0.14, 1.04, 5700, 0, 0.001, 0.022],
      [naturalPuddles, 0.557, 0.6743, 0.54, 1.09, 5500, 0, 0.001, 0.022],
      [naturalPuddles, 0.902, 0.7067, 0.32, 1.04, 3700, 0, 0.001, 0.022],
      [naturalPuddles, 1.285, 0.7206, 0.17, 1.02, 2400, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
