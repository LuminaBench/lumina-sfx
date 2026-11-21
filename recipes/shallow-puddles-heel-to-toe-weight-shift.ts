import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalPuddles from './_recordings/natural-puddles.ts';

export default {
  id: 'shallow-puddles-heel-to-toe-weight-shift', name: "Shallow puddles heel to toe weight shift", category: 'Footsteps & UI',
  tags: ["water", "wet", "splash", "puddle", "footstep", "walk", "step", "transfer", "stationary"],
  loopable: false, durationSec: 0.91, mixRole: 'foley', targetRmsDbfs: -27,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalPuddles),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalPuddles, 0, 0.7577, 0.85, 0.97, 7800, 0, 0.001, 0.022],
      [naturalPuddles, 0.148, 0.12, 0.34, 1.14, 4800, 0.042, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
