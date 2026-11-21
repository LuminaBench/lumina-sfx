import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import cardboardPackageOpen from './_recordings/cardboard-package-open.ts';
import dropRootCropsCrate from './_recordings/drop-root-crops-crate.ts';
import woodenChestShut from './_recordings/wooden-chest-shut.ts';

export default {
  id: 'parcel-set-inside-a-delivery-box', name: "Parcel set inside a delivery box", category: 'Props & Interactions',
  tags: ["parcel", "delivery", "crate", "deposit"],
  loopable: false, durationSec: 0.78, mixRole: 'detail', targetRmsDbfs: -26,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(cardboardPackageOpen, dropRootCropsCrate, woodenChestShut),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [cardboardPackageOpen, 0.0, 0.25, 0.31, 1, 10500, 0, 0.001, 0.022],
      [dropRootCropsCrate, 0.18, 0.35, 0.72, 1, 10500, 0, 0.001, 0.022],
      [woodenChestShut, 0.55, 0.18, 0.63, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
