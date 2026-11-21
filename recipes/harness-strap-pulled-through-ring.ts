import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';
import chainRattleShort from './_recordings/chain-rattle-short.ts';

export default {
  id: 'harness-strap-pulled-through-ring', name: "Harness strap pulled through ring", category: 'Props & Interactions',
  tags: ["horse", "tack", "harness", "strap", "ring"],
  loopable: false, durationSec: 0.81, mixRole: 'detail', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(leatherStrapFlex, chainRattleShort),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [leatherStrapFlex, 0.0, 0.53, 0.89, 1, 10500, 0, 0.001, 0.022],
      [chainRattleShort, 0.31, 0.19, 0.25, 1, 10500, 0, 0.001, 0.022],
      [leatherStrapFlex, 0.51, 0.25, 0.42, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
