import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalMud from './_recordings/natural-mud.ts';
import mudSquelchFootstep from './_recordings/mud-squelch-footstep.ts';

export default {
  id: 'sticky-mud-tight-turning-pivot', name: "Sticky mud tight turning pivot", category: 'Footsteps & UI',
  tags: ["mud", "wet", "bog", "suction", "footstep", "pivot", "turn", "scrape"],
  loopable: false, durationSec: 0.815, mixRole: 'foley', targetRmsDbfs: -28,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalMud, mudSquelchFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalMud, 0, 0.22, 0.72, 1, 9600, 0, 0.001, 0.022],
      [mudSquelchFootstep, 0.069, 0.35, 0.59, 1.07, 7800, 0, 0.001, 0.045],
      [naturalMud, 0.331, 0.4339, 0.37, 1.09, 6100, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
