import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseButton from './_recordings/response-button.ts';
import actionLeverCycle from './_recordings/action-lever-cycle.ts';
import responseMicroclick from './_recordings/response-microclick.ts';

export default {
  id: 'target-eliminated-with-a-latch', name: "Target eliminated with a latch", category: 'Sci-Fi & UI',
  tags: ["ui", "combat", "elimination", "kill", "confirm"],
  loopable: false, durationSec: 0.215, mixRole: 'interface', targetRmsDbfs: -24,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseButton, actionLeverCycle, responseMicroclick),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseButton, 0.0, 0.063, 0.59, 1, 10500, 0, 0.001, 0.022],
      [actionLeverCycle, 0.03, 0.135, 0.62, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.116, 0.044, 0.58, 1.22, 9600.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
