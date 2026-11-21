import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import drySandFootstep from './_recordings/dry-sand-footstep.ts';

export default {
  id: 'dune-sand-heel-to-toe-weight-shift', name: "Dune sand heel to toe weight shift", category: 'Footsteps & UI',
  tags: ["beach", "sand", "desert", "footstep", "walk", "step", "transfer", "stationary"],
  loopable: false, durationSec: 0.503, mixRole: 'foley', targetRmsDbfs: -31,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(drySandFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [drySandFootstep, 0, 0.4526, 0.85, 0.97, 7800, 0, 0.001, 0.022],
      [drySandFootstep, 0.148, 0.12, 0.34, 1.14, 4800, 0.042, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
