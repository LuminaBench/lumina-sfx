import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldPigYoung from './_recordings/field-pig-young.ts';
import pigGrunts from './_recordings/pig-grunts.ts';
import pigFeedingAtTrough from './_recordings/pig-feeding-at-trough.ts';

export default {
  id: 'piglet-calls-back-at-feeding-time', name: "Piglet calls back at feeding time", category: 'Animals',
  tags: ["pig", "piglet", "feeding", "call"],
  loopable: false, durationSec: 2.904, mixRole: 'voice', targetRmsDbfs: -24,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldPigYoung, pigGrunts, pigFeedingAtTrough),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldPigYoung, 0.0, 1.15, 0.91, 1, 10500, 0, 0.001, 0.022],
      [pigGrunts, 1.2, 0.91, 0.62, 1, 10500, 0, 0.001, 0.022],
      [pigFeedingAtTrough, 1.86, 0.93, 0.37, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.024, 0.064], send: 0.125, dampingHz: 3300 });
  },
} satisfies SoundRecipe;
