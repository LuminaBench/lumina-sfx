import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalSnow from './_recordings/natural-snow.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'packed-snow-hurried-retreat', name: "Packed snow hurried retreat", category: 'Footsteps & UI',
  tags: ["snow", "winter", "crunch", "footstep", "retreat", "run", "recede", "escape"],
  loopable: false, durationSec: 1.826, mixRole: 'foley', targetRmsDbfs: -28,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalSnow, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalSnow, 0, 0.4726, 1, 1.06, 9600, 0, 0.001, 0.022],
      [naturalSnow, 0.238, 0.4817, 0.79, 1.04, 7400, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.327, 0.21, 0.14, 1.04, 5700, 0, 0.001, 0.022],
      [naturalSnow, 0.557, 0.4596, 0.54, 1.09, 5500, 0, 0.001, 0.022],
      [naturalSnow, 0.902, 0.4817, 0.32, 1.04, 3700, 0, 0.001, 0.022],
      [naturalSnow, 1.285, 0.4912, 0.17, 1.02, 2400, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
