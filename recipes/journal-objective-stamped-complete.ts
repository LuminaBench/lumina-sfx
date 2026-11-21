import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import bookCoverShut from './_recordings/book-cover-shut.ts';
import responseRocker from './_recordings/response-rocker.ts';
import bookPageTurn from './_recordings/book-page-turn.ts';

export default {
  id: 'journal-objective-stamped-complete', name: "Journal objective stamped complete", category: 'Sci-Fi & UI',
  tags: ["ui", "quest", "complete", "journal", "stamp"],
  loopable: false, durationSec: 0.29, mixRole: 'interface', targetRmsDbfs: -25,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(bookCoverShut, responseRocker, bookPageTurn),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [bookCoverShut, 0.0, 0.126, 0.75, 0.94, 5800.0, 0, 0.001, 0.022],
      [responseRocker, 0.031, 0.09, 0.43, 1, 10500, 0, 0.001, 0.022],
      [bookPageTurn, 0.12, 0.12, 0.2, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
