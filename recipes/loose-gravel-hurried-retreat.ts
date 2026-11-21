import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGravel from './_recordings/natural-gravel.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'loose-gravel-hurried-retreat', name: "Loose gravel hurried retreat", category: 'Footsteps & UI',
  tags: ["grit", "pebbles", "trail", "footstep", "retreat", "run", "recede", "escape"],
  loopable: false, durationSec: 1.775, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGravel, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalGravel, 0, 0.3255, 1, 1.06, 9600, 0, 0.001, 0.022],
      [naturalGravel, 0.238, 0.3317, 0.79, 1.04, 7400, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.327, 0.21, 0.14, 1.04, 5700, 0, 0.001, 0.022],
      [naturalGravel, 0.557, 0.3165, 0.54, 1.09, 5500, 0, 0.001, 0.022],
      [naturalGravel, 0.902, 0.3317, 0.32, 1.04, 3700, 0, 0.001, 0.022],
      [naturalGravel, 1.285, 0.3382, 0.17, 1.02, 2400, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
