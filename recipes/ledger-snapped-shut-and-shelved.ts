import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import bookPageTurn from './_recordings/book-page-turn.ts';
import bookCoverShut from './_recordings/book-cover-shut.ts';
import slattedCrateSettle from './_recordings/slatted-crate-settle.ts';

export default {
  id: 'ledger-snapped-shut-and-shelved', name: "Ledger snapped shut and shelved", category: 'Props & Interactions',
  tags: ["book", "ledger", "close", "storage"],
  loopable: false, durationSec: 0.8, mixRole: 'detail', targetRmsDbfs: -25,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(bookPageTurn, bookCoverShut, slattedCrateSettle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [bookPageTurn, 0.0, 0.24, 0.31, 1, 10500, 0, 0.001, 0.022],
      [bookCoverShut, 0.15, 0.24, 0.93, 1, 10500, 0, 0.001, 0.022],
      [slattedCrateSettle, 0.53, 0.22, 0.27, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
