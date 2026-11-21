import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldHenFeed from './_recordings/field-hen-feed.ts';
import plantLargeSeeds from './_recordings/plant-large-seeds.ts';
import chickenClucks from './_recordings/chicken-clucks.ts';

export default {
  id: 'hen-snatches-scattered-grain', name: "Hen snatches scattered grain", category: 'Animals',
  tags: ["chicken", "hen", "feeding", "peck"],
  loopable: false, durationSec: 1.41, mixRole: 'voice', targetRmsDbfs: -25,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldHenFeed, plantLargeSeeds, chickenClucks),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldHenFeed, 0.0, 1.0, 0.74, 1, 10500, 0, 0.001, 0.022],
      [plantLargeSeeds, 0.12, 0.13, 0.11, 1, 10500, 0, 0.001, 0.022],
      [chickenClucks, 0.73, 0.63, 0.83, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
