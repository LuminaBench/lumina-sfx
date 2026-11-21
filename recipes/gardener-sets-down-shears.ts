import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import orchardShearsSnip from './_recordings/orchard-shears-snip.ts';
import slattedCrateSettle from './_recordings/slatted-crate-settle.ts';
import fieldButterKnife from './_recordings/field-butter-knife.ts';

export default {
  id: 'gardener-sets-down-shears', name: "Gardener sets down shears", category: 'Props & Interactions',
  tags: ["farm", "shears", "unequip", "workbench"],
  loopable: false, durationSec: 0.532, mixRole: 'detail', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(orchardShearsSnip, slattedCrateSettle, fieldButterKnife),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [orchardShearsSnip, 0.0, 0.18, 0.53, 1, 10500, 0, 0.001, 0.022],
      [slattedCrateSettle, 0.24, 0.21, 0.51, 1, 10500, 0, 0.001, 0.022],
      [fieldButterKnife, 0.27, 0.17, 0.41, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
