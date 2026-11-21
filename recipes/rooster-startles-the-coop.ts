import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import roosterCrow from './_recordings/rooster-crow.ts';
import henWarningCall from './_recordings/hen-warning-call.ts';
import fieldWings from './_recordings/field-wings.ts';

export default {
  id: 'rooster-startles-the-coop', name: "Rooster startles the coop", category: 'Animals',
  tags: ["rooster", "chickens", "morning"],
  loopable: false, durationSec: 2.344, mixRole: 'voice', targetRmsDbfs: -23,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(roosterCrow, henWarningCall, fieldWings),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [roosterCrow, 0.0, 1.8, 1.0, 1, 10500, 0, 0.001, 0.022],
      [henWarningCall, 1.42, 0.66, 0.4, 1, 10500, 0, 0.001, 0.022],
      [fieldWings, 1.77, 0.46, 0.26, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.024, 0.064], send: 0.125, dampingHz: 3300 });
  },
} satisfies SoundRecipe;
