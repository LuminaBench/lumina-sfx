import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGravel from './_recordings/natural-gravel.ts';
import naturalGravelDrag from './_recordings/natural-gravel-drag.ts';

export default {
  id: 'loose-gravel-tight-turning-pivot', name: "Loose gravel tight turning pivot", category: 'Footsteps & UI',
  tags: ["grit", "pebbles", "trail", "footstep", "pivot", "turn", "scrape"],
  loopable: false, durationSec: 0.799, mixRole: 'foley', targetRmsDbfs: -27,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGravel, naturalGravelDrag),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalGravel, 0, 0.22, 0.72, 1, 9600, 0, 0.001, 0.022],
      [naturalGravelDrag, 0.069, 0.35, 0.59, 1.07, 7800, 0, 0.001, 0.045],
      [naturalGravel, 0.331, 0.3165, 0.37, 1.09, 6100, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
