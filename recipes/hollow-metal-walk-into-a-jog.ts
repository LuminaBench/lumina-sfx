import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalMetal from './_recordings/natural-metal.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'hollow-metal-walk-into-a-jog', name: "Hollow metal walk into a jog", category: 'Footsteps & UI',
  tags: ["catwalk", "steel", "metal", "footstep", "walk", "jog", "accelerate", "gait"],
  loopable: false, durationSec: 2.418, mixRole: 'foley', targetRmsDbfs: -24,
  spectrum: [{ band: 'high', minShare: 0.003 }],
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalMetal, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalMetal, 0, 0.6051, 0.71, 0.98, 9600, 0, 0.001, 0.022],
      [naturalMetal, 0.571, 0.5814, 0.74, 1.02, 9600, 0, 0.001, 0.022],
      [naturalMetal, 1.04, 0.593, 0.82, 1, 9600, 0, 0.001, 0.022],
      [naturalMetal, 1.402, 0.5594, 0.94, 1.06, 9600, 0, 0.001, 0.022],
      [naturalMetal, 1.711, 0.5702, 1, 1.04, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 1.78, 0.21, 0.11, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
