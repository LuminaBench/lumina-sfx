import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import coinPileDrop from './_recordings/coin-pile-drop.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';

export default {
  id: 'coins-swept-into-a-purse', name: "Coins swept into a purse", category: 'Props & Interactions',
  tags: ["inventory", "coins", "money", "collect"],
  loopable: false, durationSec: 0.82, mixRole: 'detail', targetRmsDbfs: -25,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(coinPileDrop, leatherStrapFlex),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [coinPileDrop, 0.0, 0.47, 0.83, 1, 10500, 0, 0.001, 0.022],
      [leatherStrapFlex, 0.32, 0.34, 0.45, 1, 10500, 0, 0.001, 0.022],
      [coinPileDrop, 0.51, 0.26, 0.64, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
