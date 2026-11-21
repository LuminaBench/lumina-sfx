import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import drySandFootstep from './_recordings/dry-sand-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import pressPottingSoil from './_recordings/press-potting-soil.ts';

export default {
  id: 'dune-sand-slow-stalking-approach', name: "Dune sand slow stalking approach", category: 'Footsteps & UI',
  tags: ["beach", "sand", "desert", "footstep", "stealth", "approach", "sneak", "sequence"],
  loopable: false, durationSec: 2.094, mixRole: 'foley', targetRmsDbfs: -33,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(drySandFootstep, jacketMovementRustle, pressPottingSoil),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [drySandFootstep, 0, 0.439, 0.44, 1, 3600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.49, 0.21, 0.065, 1.04, 5700, 0, 0.001, 0.022],
      [drySandFootstep, 0.744, 0.4221, 0.64, 1.04, 4600, 0, 0.001, 0.022],
      [drySandFootstep, 1.601, 0.4434, 0.86, 0.99, 6100, 0, 0.001, 0.022],
      [pressPottingSoil, 1.746, 0.17, 0.11, 1.1, 4500, 0, 0.001, 0.045],
    ]);
  },
} satisfies SoundRecipe;
