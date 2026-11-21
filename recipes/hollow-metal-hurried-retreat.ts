import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalMetal from './_recordings/natural-metal.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'hollow-metal-hurried-retreat', name: "Hollow metal hurried retreat", category: 'Footsteps & UI',
  tags: ["catwalk", "steel", "metal", "footstep", "retreat", "run", "recede", "escape"],
  loopable: false, durationSec: 2.003, mixRole: 'foley', targetRmsDbfs: -24,
  spectrum: [{ band: 'high', minShare: 0.003 }],
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalMetal, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalMetal, 0, 0.5594, 1, 1.06, 9600, 0, 0.001, 0.022],
      [naturalMetal, 0.238, 0.5702, 0.79, 1.04, 7400, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.327, 0.21, 0.14, 1.04, 5700, 0, 0.001, 0.022],
      [naturalMetal, 0.557, 0.544, 0.54, 1.09, 5500, 0, 0.001, 0.022],
      [naturalMetal, 0.902, 0.5702, 0.32, 1.04, 3700, 0, 0.001, 0.022],
      [naturalMetal, 1.285, 0.5814, 0.17, 1.02, 2400, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
