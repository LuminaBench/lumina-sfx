import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import hardwoodFootstep from './_recordings/hardwood-footstep.ts';

export default {
  id: 'polished-hardwood-heel-to-toe-weight-shift', name: "Polished hardwood heel to toe weight shift", category: 'Footsteps & UI',
  tags: ["indoor", "oak", "wooden", "floor", "footstep", "walk", "step", "transfer", "stationary"],
  loopable: false, durationSec: 0.35, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(hardwoodFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [hardwoodFootstep, 0, 0.2474, 0.85, 0.97, 7800, 0, 0.001, 0.022],
      [hardwoodFootstep, 0.148, 0.12, 0.34, 1.14, 4800, 0.042, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
