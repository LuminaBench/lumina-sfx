import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalSnow from './_recordings/natural-snow.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'packed-snow-walk-into-a-jog', name: "Packed snow walk into a jog", category: 'Footsteps & UI',
  tags: ["snow", "winter", "crunch", "footstep", "walk", "jog", "accelerate", "gait"],
  loopable: false, durationSec: 2.243, mixRole: 'foley', targetRmsDbfs: -28,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalSnow, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalSnow, 0, 0.5112, 0.71, 0.98, 9600, 0, 0.001, 0.022],
      [naturalSnow, 0.571, 0.4912, 0.74, 1.02, 9600, 0, 0.001, 0.022],
      [naturalSnow, 1.04, 0.501, 0.82, 1, 9600, 0, 0.001, 0.022],
      [naturalSnow, 1.402, 0.4726, 0.94, 1.06, 9600, 0, 0.001, 0.022],
      [naturalSnow, 1.711, 0.4817, 1, 1.04, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 1.78, 0.21, 0.11, 1.04, 5700, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
