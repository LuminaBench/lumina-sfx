import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import milestoneRatchet from './_recordings/milestone-ratchet.ts';
import actionLeverCycle from './_recordings/action-lever-cycle.ts';
import slattedCrateSettle from './_recordings/slatted-crate-settle.ts';

export default {
  id: 'workbench-clamp-sprung-loose', name: "Workbench clamp sprung loose", category: 'Props & Interactions',
  tags: ["tool", "release", "spring", "clamp", "workshop"],
  loopable: false, durationSec: 0.64, mixRole: 'detail', targetRmsDbfs: -25,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(milestoneRatchet, actionLeverCycle, slattedCrateSettle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [milestoneRatchet, 0.0, 0.22, 0.5, 1, 10500, 0, 0.001, 0.022],
      [actionLeverCycle, 0.18, 0.3, 0.76, 1, 10500, 0, 0.001, 0.022],
      [slattedCrateSettle, 0.42, 0.17, 0.38, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
