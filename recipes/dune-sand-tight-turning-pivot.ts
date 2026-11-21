import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import drySandFootstep from './_recordings/dry-sand-footstep.ts';
import pressPottingSoil from './_recordings/press-potting-soil.ts';

export default {
  id: 'dune-sand-tight-turning-pivot', name: "Dune sand tight turning pivot", category: 'Footsteps & UI',
  tags: ["beach", "sand", "desert", "footstep", "pivot", "turn", "scrape"],
  loopable: false, durationSec: 0.784, mixRole: 'foley', targetRmsDbfs: -32,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(drySandFootstep, pressPottingSoil),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [drySandFootstep, 0, 0.22, 0.72, 1, 9600, 0, 0.001, 0.022],
      [pressPottingSoil, 0.069, 0.35, 0.59, 1.07, 7800, 0, 0.001, 0.045],
      [drySandFootstep, 0.331, 0.4028, 0.37, 1.09, 6100, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
