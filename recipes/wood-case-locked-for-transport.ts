import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import woodenChestShut from './_recordings/wooden-chest-shut.ts';
import energyCellSeating from './_recordings/energy-cell-seating.ts';
import keyTurnInLock from './_recordings/key-turn-in-lock.ts';

export default {
  id: 'wood-case-locked-for-transport', name: "Wood case locked for transport", category: 'Props & Interactions',
  tags: ["case", "lock", "transport", "inventory"],
  loopable: false, durationSec: 0.95, mixRole: 'detail', targetRmsDbfs: -25,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(woodenChestShut, energyCellSeating, keyTurnInLock),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [woodenChestShut, 0.0, 0.21, 0.88, 1, 10500, 0, 0.001, 0.022],
      [energyCellSeating, 0.28, 0.18, 0.66, 1, 10500, 0, 0.001, 0.022],
      [keyTurnInLock, 0.46, 0.44, 0.61, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
