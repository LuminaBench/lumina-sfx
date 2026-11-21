import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import actionLeverCycle from './_recordings/action-lever-cycle.ts';
import responseMicroclick from './_recordings/response-microclick.ts';
import energyCellSeating from './_recordings/energy-cell-seating.ts';

export default {
  id: 'double-elimination-double-seal', name: "Double elimination double seal", category: 'Sci-Fi & UI',
  tags: ["ui", "combat", "double", "elimination", "confirm"],
  loopable: false, durationSec: 0.366, mixRole: 'interface', targetRmsDbfs: -24,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(actionLeverCycle, responseMicroclick, energyCellSeating),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [actionLeverCycle, 0.0, 0.089, 0.59, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.064, 0.04, 0.6, 1, 10500, 0, 0.001, 0.022],
      [actionLeverCycle, 0.151, 0.111, 0.7, 1, 10500, 0, 0.001, 0.022],
      [energyCellSeating, 0.225, 0.091, 0.56, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
