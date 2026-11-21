import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import drySandFootstep from './_recordings/dry-sand-footstep.ts';
import pressPottingSoil from './_recordings/press-potting-soil.ts';

export default {
  id: 'dune-sand-short-hop-landing', name: "Dune sand short hop landing", category: 'Footsteps & UI',
  tags: ["beach", "sand", "desert", "footstep", "jump", "landing", "hop"],
  loopable: false, durationSec: 0.582, mixRole: 'foley', targetRmsDbfs: -30,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, drySandFootstep, pressPottingSoil),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.14, 0.16, 1.04, 5700, 0, 0.001, 0.022],
      [drySandFootstep, 0.084, 0.448, 1, 0.98, 9600, 0, 0.001, 0.022],
      [drySandFootstep, 0.118, 0.4065, 0.54, 1.08, 6200, 0, 0.001, 0.022],
      [pressPottingSoil, 0.177, 0.18, 0.14, 1.1, 7500, 0, 0.001, 0.045],
    ]);
  },
} satisfies SoundRecipe;
