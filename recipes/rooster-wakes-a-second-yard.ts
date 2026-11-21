import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import roosterCrow from './_recordings/rooster-crow.ts';

export default {
  id: 'rooster-wakes-a-second-yard', name: "Rooster wakes a second yard", category: 'Animals',
  tags: ["rooster", "crow", "answering", "dawn"],
  loopable: false, durationSec: 4.432, mixRole: 'voice', targetRmsDbfs: -24,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(roosterCrow),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [roosterCrow, 0.0, 2.03, 1.0, 1, 10500, 0, 0.001, 0.022],
      [roosterCrow, 2.41, 1.87, 0.26, 0.97, 3100.0, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
