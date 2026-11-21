import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import ceramicTileFootstep from './_recordings/ceramic-tile-footstep.ts';
import hardwoodFootstep from './_recordings/hardwood-footstep.ts';
import woodPlatformLanding from './_recordings/wood-platform-landing.ts';

export default {
  id: 'glazed-tile-to-polished-hardwood-walking-transition', name: "Glazed tile to polished hardwood walking transition", category: 'Footsteps & UI',
  tags: ["ceramic", "tile", "indoor", "oak", "wooden", "floor", "footstep", "crossing", "threshold", "transition", "walk"],
  loopable: false, durationSec: 1.735, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(ceramicTileFootstep, hardwoodFootstep, woodPlatformLanding),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [ceramicTileFootstep, 0, 0.2717, 0.66, 0.99, 7200, 0, 0.001, 0.022],
      [ceramicTileFootstep, 0.465, 0.269, 0.78, 1, 10500, 0, 0.001, 0.022],
      [hardwoodFootstep, 0.94, 0.24, 1, 1, 10500, 0, 0.001, 0.022],
      [woodPlatformLanding, 1.04, 0.16, 0.1, 1.07, 5900, 0, 0.001, 0.022],
      [hardwoodFootstep, 1.424, 0.2286, 0.82, 1.05, 10500, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
