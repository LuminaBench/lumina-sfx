import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseKitchenTimer from './_recordings/response-kitchen-timer.ts';
import responseButton from './_recordings/response-button.ts';

export default {
  id: 'radio-alert-acknowledged-by-hand', name: "Radio alert acknowledged by hand", category: 'Sci-Fi & UI',
  tags: ["ui", "warning", "radio", "acknowledge"],
  loopable: false, durationSec: 0.252, mixRole: 'interface', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseKitchenTimer, responseButton),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseKitchenTimer, 0.0, 0.099, 0.59, 1, 10500, 0, 0.001, 0.022],
      [responseButton, 0.121, 0.081, 0.7, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
