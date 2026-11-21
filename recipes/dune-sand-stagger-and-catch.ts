import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import drySandFootstep from './_recordings/dry-sand-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import pressPottingSoil from './_recordings/press-potting-soil.ts';

export default {
  id: 'dune-sand-stagger-and-catch', name: "Dune sand stagger and catch", category: 'Footsteps & UI',
  tags: ["beach", "sand", "desert", "footstep", "stumble", "recovery", "trip"],
  loopable: false, durationSec: 0.938, mixRole: 'foley', targetRmsDbfs: -30,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(drySandFootstep, jacketMovementRustle, pressPottingSoil),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [drySandFootstep, 0, 0.4065, 0.67, 1.08, 9600, 0, 0.001, 0.022],
      [drySandFootstep, 0.146, 0.4621, 0.84, 0.95, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.229, 0.21, 0.19, 1.04, 5700, 0, 0.001, 0.022],
      [drySandFootstep, 0.406, 0.4824, 1, 0.91, 9600, 0, 0.001, 0.022],
      [pressPottingSoil, 0.536, 0.23, 0.18, 1.02, 5400, 0, 0.001, 0.045],
    ]);
  },
} satisfies SoundRecipe;
