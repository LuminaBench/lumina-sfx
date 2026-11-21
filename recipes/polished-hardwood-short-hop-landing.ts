import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import hardwoodFootstep from './_recordings/hardwood-footstep.ts';
import woodPlatformLanding from './_recordings/wood-platform-landing.ts';

export default {
  id: 'polished-hardwood-short-hop-landing', name: "Polished hardwood short hop landing", category: 'Footsteps & UI',
  tags: ["indoor", "oak", "wooden", "floor", "footstep", "jump", "landing", "hop"],
  loopable: false, durationSec: 0.439, mixRole: 'foley', targetRmsDbfs: -24,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, hardwoodFootstep, woodPlatformLanding),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.14, 0.16, 1.04, 5700, 0, 0.001, 0.022],
      [hardwoodFootstep, 0.084, 0.2449, 1, 0.98, 9600, 0, 0.001, 0.022],
      [hardwoodFootstep, 0.118, 0.2222, 0.54, 1.08, 6200, 0, 0.001, 0.022],
      [woodPlatformLanding, 0.177, 0.18, 0.14, 1.1, 7500, 0, 0.001, 0.045],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
