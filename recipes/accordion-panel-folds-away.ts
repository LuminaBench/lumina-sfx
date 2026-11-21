import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import bookPageTurn from './_recordings/book-page-turn.ts';
import responseRocker from './_recordings/response-rocker.ts';

export default {
  id: 'accordion-panel-folds-away', name: "Accordion panel folds away", category: 'Sci-Fi & UI',
  tags: ["ui", "menu", "collapse", "fold"],
  loopable: false, durationSec: 0.226, mixRole: 'interface', targetRmsDbfs: -29,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(bookPageTurn, responseRocker),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [bookPageTurn, 0.0, 0.14, 0.3, 1.22, 4350.0, 0, 0.001, 0.022],
      [responseRocker, 0.103, 0.073, 0.69, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
