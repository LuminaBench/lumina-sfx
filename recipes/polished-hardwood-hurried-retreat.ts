import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import hardwoodFootstep from './_recordings/hardwood-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'polished-hardwood-hurried-retreat', name: "Polished hardwood hurried retreat", category: 'Footsteps & UI',
  tags: ["indoor", "oak", "wooden", "floor", "footstep", "retreat", "run", "recede", "escape"],
  loopable: false, durationSec: 1.602, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(hardwoodFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [hardwoodFootstep, 0, 0.2264, 1, 1.06, 9600, 0, 0.001, 0.022],
      [hardwoodFootstep, 0.238, 0.2308, 0.79, 1.04, 7400, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.327, 0.21, 0.14, 1.04, 5700, 0, 0.001, 0.022],
      [hardwoodFootstep, 0.557, 0.2202, 0.54, 1.09, 5500, 0, 0.001, 0.022],
      [hardwoodFootstep, 0.902, 0.2308, 0.32, 1.04, 3700, 0, 0.001, 0.022],
      [hardwoodFootstep, 1.285, 0.2353, 0.17, 1.02, 2400, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
