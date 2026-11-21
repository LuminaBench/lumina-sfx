import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalSnow from './_recordings/natural-snow.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';

export default {
  id: 'packed-snow-slow-stalking-approach', name: "Packed snow slow stalking approach", category: 'Footsteps & UI',
  tags: ["snow", "winter", "crunch", "footstep", "stealth", "approach", "sneak", "sequence"],
  loopable: false, durationSec: 2.157, mixRole: 'foley', targetRmsDbfs: -30,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalSnow, jacketMovementRustle, icyCrustFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalSnow, 0, 0.501, 0.44, 1, 3600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.49, 0.21, 0.065, 1.04, 5700, 0, 0.001, 0.022],
      [naturalSnow, 0.744, 0.4817, 0.64, 1.04, 4600, 0, 0.001, 0.022],
      [naturalSnow, 1.601, 0.5061, 0.86, 0.99, 6100, 0, 0.001, 0.022],
      [icyCrustFootstep, 1.746, 0.17, 0.11, 1.1, 4500, 0, 0.001, 0.045],
    ]);
  },
} satisfies SoundRecipe;
