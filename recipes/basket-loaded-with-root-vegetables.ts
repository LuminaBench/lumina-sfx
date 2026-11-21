import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import dropRootCropsCrate from './_recordings/drop-root-crops-crate.ts';
import slattedCrateSettle from './_recordings/slatted-crate-settle.ts';

export default {
  id: 'basket-loaded-with-root-vegetables', name: "Basket loaded with root vegetables", category: 'Props & Interactions',
  tags: ["farm", "harvest", "basket", "produce"],
  loopable: false, durationSec: 0.97, mixRole: 'detail', targetRmsDbfs: -26,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(dropRootCropsCrate, slattedCrateSettle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [dropRootCropsCrate, 0.0, 0.51, 0.81, 1, 10500, 0, 0.001, 0.022],
      [dropRootCropsCrate, 0.44, 0.46, 0.68, 1, 10500, 0, 0.001, 0.022],
      [slattedCrateSettle, 0.73, 0.19, 0.23, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
