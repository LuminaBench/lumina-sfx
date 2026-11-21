import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import pigFeedingAtTrough from './_recordings/pig-feeding-at-trough.ts';
import fieldPigSnuffle from './_recordings/field-pig-snuffle.ts';
import pigGrunts from './_recordings/pig-grunts.ts';
import slattedCrateSettle from './_recordings/slatted-crate-settle.ts';

export default {
  id: 'pigs-jostle-at-a-feed-trough', name: "Pigs jostle at a feed trough", category: 'Animals',
  tags: ["pig", "grunt", "metal", "trough", "movement"],
  loopable: false, durationSec: 2.084, mixRole: 'voice', targetRmsDbfs: -24,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(pigFeedingAtTrough, fieldPigSnuffle, pigGrunts, slattedCrateSettle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [pigFeedingAtTrough, 0.0, 0.92, 0.86, 1, 10500, 0, 0.001, 0.022],
      [fieldPigSnuffle, 0.39, 0.77, 0.64, 1, 10500, 0, 0.001, 0.022],
      [pigGrunts, 1.15, 0.82, 0.75, 1, 10500, 0, 0.001, 0.022],
      [slattedCrateSettle, 1.64, 0.2, 0.11, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.024, 0.064], send: 0.125, dampingHz: 3300 });
  },
} satisfies SoundRecipe;
