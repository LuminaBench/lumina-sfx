import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseKitchenTimer from './_recordings/response-kitchen-timer.ts';

export default {
  id: 'radar-contact-drops-out', name: "Radar contact drops out", category: 'Sci-Fi & UI',
  tags: ["ui", "radar", "loss", "warning"],
  loopable: false, durationSec: 0.306, mixRole: 'interface', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseKitchenTimer),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseKitchenTimer, 0.0, 0.11, 0.58, 0.95, 5100.0, 0, 0.001, 0.022],
      [responseKitchenTimer, 0.175, 0.081, 0.41, 0.85, 3400.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
