import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalMud from './_recordings/natural-mud.ts';
import naturalGrass from './_recordings/natural-grass.ts';
import naturalGrassDrag from './_recordings/natural-grass-drag.ts';

export default {
  id: 'sticky-mud-to-soft-grass-walking-transition', name: "Sticky mud to soft grass walking transition", category: 'Footsteps & UI',
  tags: ["mud", "wet", "bog", "suction", "grass", "turf", "meadow", "quiet", "footstep", "crossing", "threshold", "transition", "walk"],
  loopable: false, durationSec: 1.817, mixRole: 'foley', targetRmsDbfs: -29,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalMud, naturalGrass, naturalGrassDrag),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalMud, 0, 0.4778, 0.66, 0.99, 7200, 0, 0.001, 0.022],
      [naturalMud, 0.465, 0.473, 0.78, 1, 10500, 0, 0.001, 0.022],
      [naturalGrass, 0.94, 0.36, 1, 1, 10500, 0, 0.001, 0.022],
      [naturalGrassDrag, 1.04, 0.16, 0.1, 1.07, 5900, 0, 0.001, 0.022],
      [naturalGrass, 1.424, 0.3429, 0.82, 1.05, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
