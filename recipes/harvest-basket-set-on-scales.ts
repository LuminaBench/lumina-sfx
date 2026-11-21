import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import dropRootCropsCrate from './_recordings/drop-root-crops-crate.ts';
import slattedCrateSettle from './_recordings/slatted-crate-settle.ts';
import milestoneRatchet from './_recordings/milestone-ratchet.ts';

export default {
  id: 'harvest-basket-set-on-scales', name: "Harvest basket set on scales", category: 'Props & Interactions',
  tags: ["market", "farm", "basket", "weigh", "produce"],
  loopable: false, durationSec: 0.56, mixRole: 'detail', targetRmsDbfs: -26,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(dropRootCropsCrate, slattedCrateSettle, milestoneRatchet),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [dropRootCropsCrate, 0.0, 0.28, 0.5, 1, 10500, 0, 0.001, 0.022],
      [slattedCrateSettle, 0.12, 0.28, 0.67, 1, 10500, 0, 0.001, 0.022],
      [milestoneRatchet, 0.32, 0.19, 0.24, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
