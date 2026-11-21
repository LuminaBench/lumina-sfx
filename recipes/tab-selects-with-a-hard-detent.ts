import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseButton from './_recordings/response-button.ts';
import responseRocker from './_recordings/response-rocker.ts';

export default {
  id: 'tab-selects-with-a-hard-detent', name: "Tab selects with a hard detent", category: 'Sci-Fi & UI',
  tags: ["ui", "menu", "select", "tab", "detent"],
  loopable: false, durationSec: 0.188, mixRole: 'interface', targetRmsDbfs: -26,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseButton, responseRocker),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseButton, 0.0, 0.11, 0.78, 1, 10500, 0, 0.001, 0.022],
      [responseRocker, 0.053, 0.085, 0.49, 1.14, 6500.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
