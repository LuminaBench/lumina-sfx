import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import bookPageTurn from './_recordings/book-page-turn.ts';

export default {
  id: 'cards-dealt-onto-a-wooden-counter', name: "Cards dealt onto a wooden counter", category: 'Props & Interactions',
  tags: ["card", "game", "deal", "stack", "four"],
  loopable: false, durationSec: 0.92, mixRole: 'detail', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(bookPageTurn),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [bookPageTurn, 0.0, 0.14, 0.74, 1.23, 10500, 0, 0.001, 0.022],
      [bookPageTurn, 0.24, 0.13, 0.69, 1.25, 10500, 0, 0.001, 0.022],
      [bookPageTurn, 0.52, 0.14, 0.75, 1.2, 10500, 0, 0.001, 0.022],
      [bookPageTurn, 0.74, 0.13, 0.66, 1.24, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
