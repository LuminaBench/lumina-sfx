import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import hardwoodFootstep from './_recordings/hardwood-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import woodPlatformLanding from './_recordings/wood-platform-landing.ts';

export default {
  id: 'polished-hardwood-slow-stalking-approach', name: "Polished hardwood slow stalking approach", category: 'Footsteps & UI',
  tags: ["indoor", "oak", "wooden", "floor", "footstep", "stealth", "approach", "sneak", "sequence"],
  loopable: false, durationSec: 1.998, mixRole: 'foley', targetRmsDbfs: -27,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(hardwoodFootstep, jacketMovementRustle, woodPlatformLanding),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [hardwoodFootstep, 0, 0.24, 0.44, 1, 3600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.49, 0.21, 0.065, 1.04, 5700, 0, 0.001, 0.022],
      [hardwoodFootstep, 0.744, 0.2308, 0.64, 1.04, 4600, 0, 0.001, 0.022],
      [hardwoodFootstep, 1.601, 0.2424, 0.86, 0.99, 6100, 0, 0.001, 0.022],
      [woodPlatformLanding, 1.746, 0.17, 0.11, 1.1, 4500, 0, 0.001, 0.045],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
