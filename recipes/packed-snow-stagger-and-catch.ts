import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalSnow from './_recordings/natural-snow.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';

export default {
  id: 'packed-snow-stagger-and-catch', name: "Packed snow stagger and catch", category: 'Footsteps & UI',
  tags: ["snow", "winter", "crunch", "footstep", "stumble", "recovery", "trip"],
  loopable: false, durationSec: 1.006, mixRole: 'foley', targetRmsDbfs: -27,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalSnow, jacketMovementRustle, icyCrustFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalSnow, 0, 0.4639, 0.67, 1.08, 9600, 0, 0.001, 0.022],
      [naturalSnow, 0.146, 0.5274, 0.84, 0.95, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.229, 0.21, 0.19, 1.04, 5700, 0, 0.001, 0.022],
      [naturalSnow, 0.406, 0.5505, 1, 0.91, 9600, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.536, 0.23, 0.18, 1.02, 5400, 0, 0.001, 0.045],
    ]);
  },
} satisfies SoundRecipe;
