import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'empty-coin-pouch-shakes-flat', name: "Empty coin pouch shakes flat", category: 'Props & Interactions',
  tags: ["inventory", "pouch", "empty", "search"],
  loopable: false, durationSec: 0.59, mixRole: 'detail', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(leatherStrapFlex, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [leatherStrapFlex, 0.0, 0.24, 0.86, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.15, 0.18, 0.52, 1, 10500, 0, 0.001, 0.022],
      [leatherStrapFlex, 0.34, 0.2, 0.47, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
