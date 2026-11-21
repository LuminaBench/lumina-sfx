import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import drySandFootstep from './_recordings/dry-sand-footstep.ts';
import pressPottingSoil from './_recordings/press-potting-soil.ts';

export default {
  id: 'dune-sand-drop-landing-and-recovery', name: "Dune sand drop landing and recovery", category: 'Footsteps & UI',
  tags: ["beach", "sand", "desert", "footstep", "drop", "heavy", "landing", "stumble"],
  loopable: false, durationSec: 0.929, mixRole: 'foley', targetRmsDbfs: -29,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, drySandFootstep, pressPottingSoil),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.2, 0.22, 1.04, 5700, 0, 0.001, 0.022],
      [drySandFootstep, 0.061, 0.5105, 1, 0.86, 9600, 0, 0.001, 0.022],
      [drySandFootstep, 0.109, 0.467, 0.78, 0.94, 9600, 0, 0.001, 0.022],
      [pressPottingSoil, 0.177, 0.29, 0.31, 0.9, 7200, 0, 0.001, 0.045],
      [drySandFootstep, 0.469, 0.4103, 0.31, 1.07, 5400, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
