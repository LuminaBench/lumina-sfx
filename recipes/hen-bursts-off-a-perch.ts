import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import henWarningCall from './_recordings/hen-warning-call.ts';
import fieldWings from './_recordings/field-wings.ts';
import naturalPlanks from './_recordings/natural-planks.ts';

export default {
  id: 'hen-bursts-off-a-perch', name: "Hen bursts off a perch", category: 'Animals',
  tags: ["chicken", "flap", "flight", "startled"],
  loopable: false, durationSec: 0.984, mixRole: 'voice', targetRmsDbfs: -23,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(henWarningCall, fieldWings, naturalPlanks),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [henWarningCall, 0.0, 0.72, 0.85, 1, 10500, 0, 0.001, 0.022],
      [fieldWings, 0.16, 0.71, 0.76, 1, 10500, 0, 0.001, 0.022],
      [naturalPlanks, 0.18, 0.19, 0.18, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.024, 0.064], send: 0.125, dampingHz: 3300 });
  },
} satisfies SoundRecipe;
