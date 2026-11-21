import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalSnow from './_recordings/natural-snow.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';

export default {
  id: 'packed-snow-drop-landing-and-recovery', name: "Packed snow drop landing and recovery", category: 'Footsteps & UI',
  tags: ["snow", "winter", "crunch", "footstep", "drop", "heavy", "landing", "stumble"],
  loopable: false, durationSec: 0.987, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, naturalSnow, icyCrustFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.2, 0.22, 1.04, 5700, 0, 0.001, 0.022],
      [naturalSnow, 0.061, 0.5826, 1, 0.86, 9600, 0, 0.001, 0.022],
      [naturalSnow, 0.109, 0.533, 0.78, 0.94, 9600, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.177, 0.29, 0.31, 0.9, 7200, 0, 0.001, 0.045],
      [naturalSnow, 0.469, 0.4682, 0.31, 1.07, 5400, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
