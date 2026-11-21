import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';

export default {
  id: 'frozen-crust-heel-to-toe-weight-shift', name: "Frozen crust heel to toe weight shift", category: 'Footsteps & UI',
  tags: ["ice", "brittle", "frozen", "snow", "footstep", "walk", "step", "transfer", "stationary"],
  loopable: false, durationSec: 0.607, mixRole: 'foley', targetRmsDbfs: -27,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(icyCrustFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [icyCrustFootstep, 0, 0.5567, 0.85, 0.97, 7800, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.148, 0.12, 0.34, 1.14, 4800, 0.042, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
