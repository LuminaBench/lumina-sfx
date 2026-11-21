import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import bookCoverShut from './_recordings/book-cover-shut.ts';
import bookPageTurn from './_recordings/book-page-turn.ts';

export default {
  id: 'ledger-opened-across-a-desk', name: "Ledger opened across a desk", category: 'Props & Interactions',
  tags: ["paper", "ledger", "book", "inventory"],
  loopable: false, durationSec: 0.78, mixRole: 'detail', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(bookCoverShut, bookPageTurn),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [bookCoverShut, 0.0, 0.24, 0.55, 1, 10500, 0, 0.001, 0.022],
      [bookPageTurn, 0.18, 0.39, 0.77, 1, 10500, 0, 0.001, 0.022],
      [bookPageTurn, 0.46, 0.27, 0.46, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
