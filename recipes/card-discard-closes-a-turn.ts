import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import bookPageTurn from './_recordings/book-page-turn.ts';
import responseButton from './_recordings/response-button.ts';

export default {
  id: 'card-discard-closes-a-turn', name: "Card discard closes a turn", category: 'Sci-Fi & UI',
  tags: ["ui", "cards", "discard", "end", "turn"],
  loopable: false, durationSec: 0.222, mixRole: 'interface', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(bookPageTurn, responseButton),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [bookPageTurn, 0.0, 0.12, 0.39, 1.18, 5400.0, 0, 0.001, 0.022],
      [responseButton, 0.099, 0.073, 0.63, 0.95, 5500.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
