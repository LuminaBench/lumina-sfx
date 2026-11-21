import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalAsphalt from './_recordings/natural-asphalt.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'wet-asphalt-hurried-retreat', name: "Wet asphalt hurried retreat", category: 'Footsteps & UI',
  tags: ["rain", "street", "pavement", "footstep", "retreat", "run", "recede", "escape"],
  loopable: false, durationSec: 1.756, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalAsphalt, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalAsphalt, 0, 0.3066, 1, 1.06, 9600, 0, 0.001, 0.022],
      [naturalAsphalt, 0.238, 0.3125, 0.79, 1.04, 7400, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.327, 0.21, 0.14, 1.04, 5700, 0, 0.001, 0.022],
      [naturalAsphalt, 0.557, 0.2982, 0.54, 1.09, 5500, 0, 0.001, 0.022],
      [naturalAsphalt, 0.902, 0.3125, 0.32, 1.04, 3700, 0, 0.001, 0.022],
      [naturalAsphalt, 1.285, 0.3186, 0.17, 1.02, 2400, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
