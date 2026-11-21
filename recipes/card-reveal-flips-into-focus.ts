import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import bookPageTurn from './_recordings/book-page-turn.ts';
import responseMicroclick from './_recordings/response-microclick.ts';

export default {
  id: 'card-reveal-flips-into-focus', name: "Card reveal flips into focus", category: 'Sci-Fi & UI',
  tags: ["ui", "cards", "reveal", "focus", "hand"],
  loopable: false, durationSec: 0.184, mixRole: 'interface', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(bookPageTurn, responseMicroclick),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [bookPageTurn, 0.0, 0.134, 0.45, 1.23, 6700.0, 0, 0.001, 0.022],
      [responseMicroclick, 0.088, 0.042, 0.73, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
