import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldCoopRoom from './_recordings/field-coop-room.ts';
import pigFeedingAtTrough from './_recordings/pig-feeding-at-trough.ts';
import fieldPigSnuffle from './_recordings/field-pig-snuffle.ts';
import pigGrunts from './_recordings/pig-grunts.ts';

export default {
  id: 'pigs-eating-in-a-timber-pen-loop', name: "Pigs eating in a timber pen loop", category: 'Animals',
  tags: ["pig", "trough", "feed", "farm", "barn", "loop"],
  loopable: true, durationSec: 4.5, mixRole: 'ambience', targetRmsDbfs: -28,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldCoopRoom, pigFeedingAtTrough, fieldPigSnuffle, pigGrunts),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldCoopRoom, 0, 5.0, 0.11, 1, 3100, 4.0, 0.001, 0.015],
      [pigFeedingAtTrough, 0.14, 0.96, 0.88, 1, 10500, 0, 0.001, 0.022],
      [fieldPigSnuffle, 1.28, 0.81, 0.72, 1, 10500, 0, 0.001, 0.022],
      [pigGrunts, 2.46, 0.82, 0.55, 1, 10500, 0, 0.001, 0.022],
      [pigFeedingAtTrough, 3.49, 0.89, 0.63, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
