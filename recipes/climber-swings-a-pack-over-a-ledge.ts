import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import twoFootLanding from './_recordings/two-foot-landing.ts';

export default {
  id: 'climber-swings-a-pack-over-a-ledge', name: "Climber swings a pack over a ledge", category: 'Props & Interactions',
  tags: ["backpack", "climbing", "traversal", "gear"],
  loopable: false, durationSec: 0.83, mixRole: 'detail', targetRmsDbfs: -25,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(leatherStrapFlex, jacketMovementRustle, twoFootLanding),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [leatherStrapFlex, 0.0, 0.51, 0.65, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.17, 0.31, 0.62, 1, 10500, 0, 0.001, 0.022],
      [twoFootLanding, 0.54, 0.24, 0.84, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
