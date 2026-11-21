import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseRocker from './_recordings/response-rocker.ts';
import responseMicroclick from './_recordings/response-microclick.ts';

export default {
  id: 'tab-returns-to-previous-selection', name: "Tab returns to previous selection", category: 'Sci-Fi & UI',
  tags: ["ui", "menu", "back", "return", "tab"],
  loopable: false, durationSec: 0.172, mixRole: 'interface', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseRocker, responseMicroclick),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseRocker, 0.0, 0.08, 0.76, 0.95, 6100.0, 0, 0.001, 0.022],
      [responseMicroclick, 0.075, 0.047, 0.38, 0.96, 4500.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
