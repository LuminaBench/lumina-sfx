import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalSnow from './_recordings/natural-snow.ts';

export default {
  id: 'packed-snow-heel-to-toe-weight-shift', name: "Packed snow heel to toe weight shift", category: 'Footsteps & UI',
  tags: ["snow", "winter", "crunch", "footstep", "walk", "step", "transfer", "stationary"],
  loopable: false, durationSec: 0.567, mixRole: 'foley', targetRmsDbfs: -28,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalSnow),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalSnow, 0, 0.5165, 0.85, 0.97, 7800, 0, 0.001, 0.022],
      [naturalSnow, 0.148, 0.12, 0.34, 1.14, 4800, 0.042, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
