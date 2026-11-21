import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalAsphalt from './_recordings/natural-asphalt.ts';

export default {
  id: 'wet-asphalt-heel-to-toe-weight-shift', name: "Wet asphalt heel to toe weight shift", category: 'Footsteps & UI',
  tags: ["rain", "street", "pavement", "footstep", "walk", "step", "transfer", "stationary"],
  loopable: false, durationSec: 0.487, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalAsphalt),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalAsphalt, 0, 0.3351, 0.85, 0.97, 7800, 0, 0.001, 0.022],
      [naturalAsphalt, 0.148, 0.12, 0.34, 1.14, 4800, 0.042, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
