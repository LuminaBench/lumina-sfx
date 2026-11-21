import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGravel from './_recordings/natural-gravel.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalGravelDrag from './_recordings/natural-gravel-drag.ts';

export default {
  id: 'loose-gravel-stagger-and-catch', name: "Loose gravel stagger and catch", category: 'Footsteps & UI',
  tags: ["grit", "pebbles", "trail", "footstep", "stumble", "recovery", "trip"],
  loopable: false, durationSec: 0.937, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGravel, jacketMovementRustle, naturalGravelDrag),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalGravel, 0, 0.3194, 0.67, 1.08, 9600, 0, 0.001, 0.022],
      [naturalGravel, 0.146, 0.3632, 0.84, 0.95, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.229, 0.21, 0.19, 1.04, 5700, 0, 0.001, 0.022],
      [naturalGravel, 0.406, 0.3791, 1, 0.91, 9600, 0, 0.001, 0.022],
      [naturalGravelDrag, 0.536, 0.23, 0.18, 1.02, 5400, 0, 0.001, 0.045],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
