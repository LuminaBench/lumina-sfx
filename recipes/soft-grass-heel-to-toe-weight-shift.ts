import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGrass from './_recordings/natural-grass.ts';

export default {
  id: 'soft-grass-heel-to-toe-weight-shift', name: "Soft grass heel to toe weight shift", category: 'Footsteps & UI',
  tags: ["grass", "turf", "meadow", "quiet", "footstep", "walk", "step", "transfer", "stationary"],
  loopable: false, durationSec: 0.421, mixRole: 'foley', targetRmsDbfs: -31,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGrass),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalGrass, 0, 0.3711, 0.85, 0.97, 7800, 0, 0.001, 0.022],
      [naturalGrass, 0.148, 0.12, 0.34, 1.14, 4800, 0.042, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
