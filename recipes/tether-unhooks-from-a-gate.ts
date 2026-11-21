import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import energyCellSeating from './_recordings/energy-cell-seating.ts';
import chainRattleShort from './_recordings/chain-rattle-short.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';

export default {
  id: 'tether-unhooks-from-a-gate', name: "Tether unhooks from a gate", category: 'Props & Interactions',
  tags: ["horse", "tether", "lead", "metal", "release"],
  loopable: false, durationSec: 0.77, mixRole: 'detail', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(energyCellSeating, chainRattleShort, leatherStrapFlex),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [energyCellSeating, 0.0, 0.21, 0.72, 1, 10500, 0, 0.001, 0.022],
      [chainRattleShort, 0.13, 0.41, 0.62, 1, 10500, 0, 0.001, 0.022],
      [leatherStrapFlex, 0.45, 0.27, 0.26, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
