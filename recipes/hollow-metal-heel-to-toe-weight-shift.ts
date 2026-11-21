import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalMetal from './_recordings/natural-metal.ts';

export default {
  id: 'hollow-metal-heel-to-toe-weight-shift', name: "Hollow metal heel to toe weight shift", category: 'Footsteps & UI',
  tags: ["catwalk", "steel", "metal", "footstep", "walk", "step", "transfer", "stationary"],
  loopable: false, durationSec: 0.748, mixRole: 'foley', targetRmsDbfs: -24,
  spectrum: [{ band: 'high', minShare: 0.003 }],
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalMetal),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalMetal, 0, 0.6113, 0.85, 0.97, 7800, 0, 0.001, 0.022],
      [naturalMetal, 0.148, 0.12, 0.34, 1.14, 4800, 0.042, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
