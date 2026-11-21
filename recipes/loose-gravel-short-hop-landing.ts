import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalGravel from './_recordings/natural-gravel.ts';
import naturalGravelDrag from './_recordings/natural-gravel-drag.ts';

export default {
  id: 'loose-gravel-short-hop-landing', name: "Loose gravel short hop landing", category: 'Footsteps & UI',
  tags: ["grit", "pebbles", "trail", "footstep", "jump", "landing", "hop"],
  loopable: false, durationSec: 0.589, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, naturalGravel, naturalGravelDrag),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.14, 0.16, 1.04, 5700, 0, 0.001, 0.022],
      [naturalGravel, 0.084, 0.352, 1, 0.98, 9600, 0, 0.001, 0.022],
      [naturalGravel, 0.118, 0.3194, 0.54, 1.08, 6200, 0, 0.001, 0.022],
      [naturalGravelDrag, 0.177, 0.18, 0.14, 1.1, 7500, 0, 0.001, 0.045],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
