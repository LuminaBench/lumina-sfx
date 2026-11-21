import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalSnow from './_recordings/natural-snow.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'packed-snow-careful-toe-placement', name: "Packed snow careful toe placement", category: 'Footsteps & UI',
  tags: ["snow", "winter", "crunch", "footstep", "sneak", "tiptoe", "quiet", "stealth"],
  loopable: false, durationSec: 0.314, mixRole: 'foley', targetRmsDbfs: -31,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalSnow, icyCrustFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalSnow, 0, 0.2, 0.7, 1.08, 5400, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.104, 0.16, 0.1, 1.05, 3600, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.025, 0.21, 0.055, 1.04, 5700, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
