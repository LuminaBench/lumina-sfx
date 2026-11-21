import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseButton from './_recordings/response-button.ts';

export default {
  id: 'disabled-control-shallow-press', name: "Disabled control shallow press", category: 'Sci-Fi & UI',
  tags: ["ui", "menu", "disabled", "denied", "unavailable"],
  loopable: false, durationSec: 0.189, mixRole: 'interface', targetRmsDbfs: -29,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseButton),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseButton, 0.0, 0.066, 0.67, 0.91, 3700.0, 0, 0.001, 0.022],
      [responseButton, 0.084, 0.055, 0.32, 0.97, 3100.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
