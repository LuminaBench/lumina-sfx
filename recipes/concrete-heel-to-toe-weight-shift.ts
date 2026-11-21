import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalConcrete from './_recordings/natural-concrete.ts';

export default {
  id: 'concrete-heel-to-toe-weight-shift', name: "Concrete heel to toe weight shift", category: 'Footsteps & UI',
  tags: ["pavement", "cement", "hard", "footstep", "walk", "step", "transfer", "stationary"],
  loopable: false, durationSec: 0.468, mixRole: 'foley', targetRmsDbfs: -24,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalConcrete),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalConcrete, 0, 0.3856, 0.85, 0.97, 7800, 0, 0.001, 0.022],
      [naturalConcrete, 0.148, 0.12, 0.34, 1.14, 4800, 0.042, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
