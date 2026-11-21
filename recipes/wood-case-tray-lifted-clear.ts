import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import woodenChestLatchRelease from './_recordings/wooden-chest-latch-release.ts';
import woodenChestOpen from './_recordings/wooden-chest-open.ts';
import slattedCrateSettle from './_recordings/slatted-crate-settle.ts';

export default {
  id: 'wood-case-tray-lifted-clear', name: "Wood case tray lifted clear", category: 'Props & Interactions',
  tags: ["case", "container", "loot", "removable", "tray"],
  loopable: false, durationSec: 1.11, mixRole: 'detail', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(woodenChestLatchRelease, woodenChestOpen, slattedCrateSettle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [woodenChestLatchRelease, 0.0, 0.36, 0.56, 1, 10500, 0, 0.001, 0.022],
      [woodenChestOpen, 0.29, 0.62, 0.76, 1, 10500, 0, 0.001, 0.022],
      [slattedCrateSettle, 0.81, 0.25, 0.44, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
