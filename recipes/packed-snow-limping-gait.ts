import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalSnow from './_recordings/natural-snow.ts';
import icyCrustFootstep from './_recordings/icy-crust-footstep.ts';

export default {
  id: 'packed-snow-limping-gait', name: "Packed snow limping gait", category: 'Footsteps & UI',
  tags: ["snow", "winter", "crunch", "footstep", "injured", "limp", "irregular", "walk", "cycle"],
  loopable: false, durationSec: 1.917, mixRole: 'foley', targetRmsDbfs: -29,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalSnow, icyCrustFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalSnow, 0, 0.5387, 1, 0.93, 9600, 0, 0.001, 0.022],
      [icyCrustFootstep, 0.168, 0.27, 0.35, 0.86, 5600, 0, 0.001, 0.045],
      [naturalSnow, 0.346, 0.4639, 0.41, 1.08, 5200, 0, 0.001, 0.022],
      [naturalSnow, 1.047, 0.5219, 0.9, 0.96, 9600, 0, 0.001, 0.022],
      [icyCrustFootstep, 1.214, 0.22, 0.31, 0.9, 5800, 0, 0.001, 0.045],
      [naturalSnow, 1.385, 0.4817, 0.37, 1.04, 5100, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
