import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import bookPageTurn from './_recordings/book-page-turn.ts';
import responseMicroclick from './_recordings/response-microclick.ts';

export default {
  id: 'journal-objective-silently-tracked', name: "Journal objective silently tracked", category: 'Sci-Fi & UI',
  tags: ["ui", "quest", "track", "journal", "select"],
  loopable: false, durationSec: 0.187, mixRole: 'interface', targetRmsDbfs: -29,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(bookPageTurn, responseMicroclick),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [bookPageTurn, 0.0, 0.125, 0.29, 1.15, 5200.0, 0, 0.001, 0.022],
      [responseMicroclick, 0.094, 0.043, 0.8, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
