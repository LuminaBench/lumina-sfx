import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGravel from './_recordings/natural-gravel.ts';
import dryLeavesFootstep from './_recordings/dry-leaves-footstep.ts';
import dryVineBrush from './_recordings/dry-vine-brush.ts';

export default {
  id: 'loose-gravel-to-leaf-litter-walking-transition', name: "Loose gravel to leaf litter walking transition", category: 'Footsteps & UI',
  tags: ["grit", "pebbles", "trail", "autumn", "forest", "dry", "leaves", "footstep", "crossing", "threshold", "transition", "walk"],
  loopable: false, durationSec: 2.145, mixRole: 'foley', targetRmsDbfs: -28,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGravel, dryLeavesFootstep, dryVineBrush),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalGravel, 0, 0.3485, 0.66, 0.99, 7200, 0, 0.001, 0.022],
      [naturalGravel, 0.465, 0.345, 0.78, 1, 10500, 0, 0.001, 0.022],
      [dryLeavesFootstep, 0.94, 0.705, 1, 1, 10500, 0, 0.001, 0.022],
      [dryVineBrush, 1.04, 0.16, 0.1, 1.07, 5900, 0, 0.001, 0.022],
      [dryLeavesFootstep, 1.424, 0.6714, 0.82, 1.05, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
