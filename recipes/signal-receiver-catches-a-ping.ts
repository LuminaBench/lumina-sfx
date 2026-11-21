import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseMicroclick from './_recordings/response-microclick.ts';
import responseKitchenTimer from './_recordings/response-kitchen-timer.ts';

export default {
  id: 'signal-receiver-catches-a-ping', name: "Signal receiver catches a ping", category: 'Sci-Fi & UI',
  tags: ["ui", "radar", "contact", "acquisition"],
  loopable: false, durationSec: 0.213, mixRole: 'interface', targetRmsDbfs: -26,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseMicroclick, responseKitchenTimer),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseMicroclick, 0.0, 0.04, 0.45, 1, 10500, 0, 0.001, 0.022],
      [responseKitchenTimer, 0.035, 0.128, 0.77, 1.06, 8900.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
