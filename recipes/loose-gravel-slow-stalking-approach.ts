import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGravel from './_recordings/natural-gravel.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalGravelDrag from './_recordings/natural-gravel-drag.ts';

export default {
  id: 'loose-gravel-slow-stalking-approach', name: "Loose gravel slow stalking approach", category: 'Footsteps & UI',
  tags: ["grit", "pebbles", "trail", "footstep", "stealth", "approach", "sneak", "sequence"],
  loopable: false, durationSec: 2.102, mixRole: 'foley', targetRmsDbfs: -28,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGravel, jacketMovementRustle, naturalGravelDrag),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalGravel, 0, 0.345, 0.44, 1, 3600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.49, 0.21, 0.065, 1.04, 5700, 0, 0.001, 0.022],
      [naturalGravel, 0.744, 0.3317, 0.64, 1.04, 4600, 0, 0.001, 0.022],
      [naturalGravel, 1.601, 0.3485, 0.86, 0.99, 6100, 0, 0.001, 0.022],
      [naturalGravelDrag, 1.746, 0.17, 0.11, 1.1, 4500, 0, 0.001, 0.045],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
