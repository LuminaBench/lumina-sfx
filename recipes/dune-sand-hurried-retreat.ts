import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import drySandFootstep from './_recordings/dry-sand-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'dune-sand-hurried-retreat', name: "Dune sand hurried retreat", category: 'Footsteps & UI',
  tags: ["beach", "sand", "desert", "footstep", "retreat", "run", "recede", "escape"],
  loopable: false, durationSec: 1.765, mixRole: 'foley', targetRmsDbfs: -31,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(drySandFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [drySandFootstep, 0, 0.4142, 1, 1.06, 9600, 0, 0.001, 0.022],
      [drySandFootstep, 0.238, 0.4221, 0.79, 1.04, 7400, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.327, 0.21, 0.14, 1.04, 5700, 0, 0.001, 0.022],
      [drySandFootstep, 0.557, 0.4028, 0.54, 1.09, 5500, 0, 0.001, 0.022],
      [drySandFootstep, 0.902, 0.4221, 0.32, 1.04, 3700, 0, 0.001, 0.022],
      [drySandFootstep, 1.285, 0.4304, 0.17, 1.02, 2400, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
