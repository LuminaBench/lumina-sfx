import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import twoFootLanding from './_recordings/two-foot-landing.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';

export default {
  id: 'canvas-pack-set-on-floor', name: "Canvas pack set on floor", category: 'Props & Interactions',
  tags: ["equipment", "backpack", "inventory", "unequip"],
  loopable: false, durationSec: 0.7, mixRole: 'detail', targetRmsDbfs: -25,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, twoFootLanding, leatherStrapFlex),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [jacketMovementRustle, 0.0, 0.29, 0.6, 1, 10500, 0, 0.001, 0.022],
      [twoFootLanding, 0.22, 0.21, 0.82, 1, 10500, 0, 0.001, 0.022],
      [leatherStrapFlex, 0.34, 0.31, 0.43, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
