import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import energyCellSeating from './_recordings/energy-cell-seating.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';

export default {
  id: 'leather-pouch-clasp-opened', name: "Leather pouch clasp opened", category: 'Props & Interactions',
  tags: ["inventory", "pouch", "leather", "open"],
  loopable: false, durationSec: 0.6, mixRole: 'detail', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(energyCellSeating, leatherStrapFlex),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [energyCellSeating, 0.0, 0.19, 0.71, 1, 10500, 0, 0.001, 0.022],
      [leatherStrapFlex, 0.12, 0.43, 0.82, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
