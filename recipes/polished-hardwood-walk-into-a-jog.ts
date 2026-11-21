import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import hardwoodFootstep from './_recordings/hardwood-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'polished-hardwood-walk-into-a-jog', name: "Polished hardwood walk into a jog", category: 'Footsteps & UI',
  tags: ["indoor", "oak", "wooden", "floor", "footstep", "walk", "jog", "accelerate", "gait"],
  loopable: false, durationSec: 2.072, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(hardwoodFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [hardwoodFootstep, 0, 0.2449, 0.71, 0.98, 9600, 0, 0.001, 0.022],
      [hardwoodFootstep, 0.571, 0.2353, 0.74, 1.02, 9600, 0, 0.001, 0.022],
      [hardwoodFootstep, 1.04, 0.24, 0.82, 1, 9600, 0, 0.001, 0.022],
      [hardwoodFootstep, 1.402, 0.2264, 0.94, 1.06, 9600, 0, 0.001, 0.022],
      [hardwoodFootstep, 1.711, 0.2308, 1, 1.04, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 1.78, 0.21, 0.11, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
