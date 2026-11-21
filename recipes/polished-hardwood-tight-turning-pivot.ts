import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import hardwoodFootstep from './_recordings/hardwood-footstep.ts';
import woodPlatformLanding from './_recordings/wood-platform-landing.ts';

export default {
  id: 'polished-hardwood-tight-turning-pivot', name: "Polished hardwood tight turning pivot", category: 'Footsteps & UI',
  tags: ["indoor", "oak", "wooden", "floor", "footstep", "pivot", "turn", "scrape"],
  loopable: false, durationSec: 0.633, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(hardwoodFootstep, woodPlatformLanding),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [hardwoodFootstep, 0, 0.22, 0.72, 1, 9600, 0, 0.001, 0.022],
      [woodPlatformLanding, 0.069, 0.35, 0.59, 1.07, 7800, 0, 0.001, 0.045],
      [hardwoodFootstep, 0.331, 0.2202, 0.37, 1.09, 6100, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
