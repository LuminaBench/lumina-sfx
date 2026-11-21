import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGravel from './_recordings/natural-gravel.ts';
import naturalGravelDrag from './_recordings/natural-gravel-drag.ts';

export default {
  id: 'loose-gravel-limping-gait', name: "Loose gravel limping gait", category: 'Footsteps & UI',
  tags: ["grit", "pebbles", "trail", "footstep", "injured", "limp", "irregular", "walk", "cycle"],
  loopable: false, durationSec: 1.869, mixRole: 'foley', targetRmsDbfs: -27,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGravel, naturalGravelDrag),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalGravel, 0, 0.371, 1, 0.93, 9600, 0, 0.001, 0.022],
      [naturalGravelDrag, 0.168, 0.27, 0.35, 0.86, 5600, 0, 0.001, 0.045],
      [naturalGravel, 0.346, 0.3194, 0.41, 1.08, 5200, 0, 0.001, 0.022],
      [naturalGravel, 1.047, 0.3594, 0.9, 0.96, 9600, 0, 0.001, 0.022],
      [naturalGravelDrag, 1.214, 0.22, 0.31, 0.9, 5800, 0, 0.001, 0.045],
      [naturalGravel, 1.385, 0.3317, 0.37, 1.04, 5100, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
