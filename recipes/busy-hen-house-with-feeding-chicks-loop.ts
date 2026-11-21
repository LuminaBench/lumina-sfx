import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldCoopRoom from './_recordings/field-coop-room.ts';
import fieldHenFeed from './_recordings/field-hen-feed.ts';
import chickenClucks from './_recordings/chicken-clucks.ts';
import chicksPeeping from './_recordings/chicks-peeping.ts';

export default {
  id: 'busy-hen-house-with-feeding-chicks-loop', name: "Busy hen house with feeding chicks loop", category: 'Animals',
  tags: ["chickens", "coop", "hens", "chicks", "barn", "loop"],
  loopable: true, durationSec: 4.5, mixRole: 'ambience', targetRmsDbfs: -28,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldCoopRoom, fieldHenFeed, chickenClucks, chicksPeeping),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldCoopRoom, 0, 5.0, 0.41, 1, 7850, 2.0, 0.001, 0.015],
      [fieldHenFeed, 0.44, 0.97, 0.67, 1, 10500, 0, 0.001, 0.022],
      [chickenClucks, 1.63, 0.65, 0.54, 1, 10500, 0, 0.001, 0.022],
      [chicksPeeping, 2.87, 1.08, 0.44, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
