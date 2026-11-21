import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import drySandFootstep from './_recordings/dry-sand-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'dune-sand-walk-into-a-jog', name: "Dune sand walk into a jog", category: 'Footsteps & UI',
  tags: ["beach", "sand", "desert", "footstep", "walk", "jog", "accelerate", "gait"],
  loopable: false, durationSec: 2.183, mixRole: 'foley', targetRmsDbfs: -31,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(drySandFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [drySandFootstep, 0, 0.448, 0.71, 0.98, 9600, 0, 0.001, 0.022],
      [drySandFootstep, 0.571, 0.4304, 0.74, 1.02, 9600, 0, 0.001, 0.022],
      [drySandFootstep, 1.04, 0.439, 0.82, 1, 9600, 0, 0.001, 0.022],
      [drySandFootstep, 1.402, 0.4142, 0.94, 1.06, 9600, 0, 0.001, 0.022],
      [drySandFootstep, 1.711, 0.4221, 1, 1.04, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 1.78, 0.21, 0.11, 1.04, 5700, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
