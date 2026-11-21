import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';
import energyCellSeating from './_recordings/energy-cell-seating.ts';

export default {
  id: 'belt-buckle-under-tension', name: "Belt buckle under tension", category: 'Props & Interactions',
  tags: ["equipment", "buckle", "strap", "cinch"],
  loopable: false, durationSec: 0.65, mixRole: 'detail', targetRmsDbfs: -26,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(leatherStrapFlex, energyCellSeating),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [leatherStrapFlex, 0.0, 0.43, 0.88, 1, 10500, 0, 0.001, 0.022],
      [energyCellSeating, 0.31, 0.19, 0.51, 1, 10500, 0, 0.001, 0.022],
      [leatherStrapFlex, 0.43, 0.17, 0.27, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
