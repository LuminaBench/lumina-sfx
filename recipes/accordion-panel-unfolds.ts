import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseMicroclick from './_recordings/response-microclick.ts';
import bookPageTurn from './_recordings/book-page-turn.ts';

export default {
  id: 'accordion-panel-unfolds', name: "Accordion panel unfolds", category: 'Sci-Fi & UI',
  tags: ["ui", "menu", "expand", "unfold", "accordion"],
  loopable: false, durationSec: 0.266, mixRole: 'interface', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseMicroclick, bookPageTurn),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseMicroclick, 0.0, 0.04, 0.62, 1, 10500, 0, 0.001, 0.022],
      [bookPageTurn, 0.015, 0.16, 0.26, 1.2, 5200.0, 0, 0.001, 0.022],
      [responseMicroclick, 0.176, 0.04, 0.39, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
