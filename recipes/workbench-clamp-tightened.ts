import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import milestoneRatchet from './_recordings/milestone-ratchet.ts';
import slattedCrateSettle from './_recordings/slatted-crate-settle.ts';

export default {
  id: 'workbench-clamp-tightened', name: "Workbench clamp tightened", category: 'Props & Interactions',
  tags: ["tool", "ratchet", "workshop", "crafting", "clamp"],
  loopable: false, durationSec: 0.9, mixRole: 'detail', targetRmsDbfs: -25,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(milestoneRatchet, slattedCrateSettle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [milestoneRatchet, 0.0, 0.36, 0.77, 1, 10500, 0, 0.001, 0.022],
      [milestoneRatchet, 0.38, 0.31, 0.69, 1, 10500, 0, 0.001, 0.022],
      [slattedCrateSettle, 0.67, 0.18, 0.29, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
