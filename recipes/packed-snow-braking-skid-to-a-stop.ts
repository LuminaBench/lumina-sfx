import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalSnow from './_recordings/natural-snow.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'packed-snow-braking-skid-to-a-stop', name: "Packed snow braking skid to a stop", category: 'Footsteps & UI',
  tags: ["snow", "winter", "crunch", "footstep", "stop", "sprint", "brake", "scuff"],
  loopable: false, durationSec: 0.786, mixRole: 'foley', targetRmsDbfs: -27,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalSnow, icyCrustFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalSnow, 0, 0.22, 0.81, 1.1, 9600, 0, 0.001, 0.022],
      [naturalSnow, 0.203, 0.533, 0.95, 0.94, 9600, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.246, 0.44, 0.64, 0.82, 8800, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.287, 0.21, 0.12, 1.04, 5700, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
