import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGravel from './_recordings/natural-gravel.ts';
import naturalGravelDrag from './_recordings/natural-gravel-drag.ts';

export default {
  perspective: "close ground", contains: ["boot on loose gravel"], markers: {"plant": 0.03},
  id: 'gravel-footstep', name: "Gravel Footstep", category: 'Footsteps & UI',
  tags: ["gravel", "stone", "crunch", "grit", "pebbles", "trail", "footstep", "walk"],
  loopable: false, durationSec: 0.52, mixRole: 'foley', targetRmsDbfs: -26,
  params: { coarseness: { label: 'Coarseness', min: 0, max: 1, default: 0.72 } },
  ...performanceCredits(naturalGravel, naturalGravelDrag),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.coarseness, [
      [naturalGravel, 0, 0.4264, 1, 1.025 - 0.061 * params.coarseness, 5200 + params.coarseness * 5900, 0, 0.001, 0.022],
      [naturalGravelDrag, 0.085, 0.2288, 0.05 + params.coarseness * 0.12, 1.03, 3800 + 2100 * params.coarseness, 0, 0.001, 0.022],
    ], { taps: [0.008, 0.019], send: 0.035, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
