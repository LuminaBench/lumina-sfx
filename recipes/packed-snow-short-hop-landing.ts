import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalSnow from './_recordings/natural-snow.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';

export default {
  id: 'packed-snow-short-hop-landing', name: "Packed snow short hop landing", category: 'Footsteps & UI',
  tags: ["snow", "winter", "crunch", "footstep", "jump", "landing", "hop"],
  loopable: false, durationSec: 0.645, mixRole: 'foley', targetRmsDbfs: -27,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, naturalSnow, icyCrustFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.14, 0.16, 1.04, 5700, 0, 0.001, 0.022],
      [naturalSnow, 0.084, 0.5112, 1, 0.98, 9600, 0, 0.001, 0.022],
      [naturalSnow, 0.118, 0.4639, 0.54, 1.08, 6200, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.177, 0.18, 0.14, 1.1, 7500, 0, 0.001, 0.045],
    ]);
  },
} satisfies SoundRecipe;
