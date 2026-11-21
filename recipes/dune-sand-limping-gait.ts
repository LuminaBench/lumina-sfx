import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import drySandFootstep from './_recordings/dry-sand-footstep.ts';
import pressPottingSoil from './_recordings/press-potting-soil.ts';

export default {
  id: 'dune-sand-limping-gait', name: "Dune sand limping gait", category: 'Footsteps & UI',
  tags: ["beach", "sand", "desert", "footstep", "injured", "limp", "irregular", "walk", "cycle"],
  loopable: false, durationSec: 1.857, mixRole: 'foley', targetRmsDbfs: -32,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(drySandFootstep, pressPottingSoil),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [drySandFootstep, 0, 0.472, 1, 0.93, 9600, 0, 0.001, 0.022],
      [pressPottingSoil, 0.168, 0.27, 0.35, 0.86, 5600, 0, 0.001, 0.045],
      [drySandFootstep, 0.346, 0.4065, 0.41, 1.08, 5200, 0, 0.001, 0.022],
      [drySandFootstep, 1.047, 0.4573, 0.9, 0.96, 9600, 0, 0.001, 0.022],
      [pressPottingSoil, 1.214, 0.22, 0.31, 0.9, 5800, 0, 0.001, 0.045],
      [drySandFootstep, 1.385, 0.4221, 0.37, 1.04, 5100, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
