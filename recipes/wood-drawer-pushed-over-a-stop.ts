import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import woodenDrawerShut from './_recordings/wooden-drawer-shut.ts';
import slattedCrateSettle from './_recordings/slatted-crate-settle.ts';

export default {
  id: 'wood-drawer-pushed-over-a-stop', name: "Wood drawer pushed over a stop", category: 'Props & Interactions',
  tags: ["drawer", "cabinet", "shut", "stop"],
  loopable: false, durationSec: 0.822, mixRole: 'detail', targetRmsDbfs: -25,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(woodenDrawerShut, slattedCrateSettle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [woodenDrawerShut, 0.0, 0.62, 0.88, 1, 10500, 0, 0.001, 0.022],
      [slattedCrateSettle, 0.48, 0.26, 0.36, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
