import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import coinPileDrop from './_recordings/coin-pile-drop.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';
import energyCellSeating from './_recordings/energy-cell-seating.ts';

export default {
  id: 'leather-pouch-closes-over-coins', name: "Leather pouch closes over coins", category: 'Props & Interactions',
  tags: ["inventory", "money", "pouch", "close"],
  loopable: false, durationSec: 0.66, mixRole: 'detail', targetRmsDbfs: -26,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(coinPileDrop, leatherStrapFlex, energyCellSeating),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [coinPileDrop, 0.0, 0.21, 0.4, 1, 10500, 0, 0.001, 0.022],
      [leatherStrapFlex, 0.19, 0.33, 0.73, 1, 10500, 0, 0.001, 0.022],
      [energyCellSeating, 0.41, 0.2, 0.72, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
