import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseCeilingPiezo from './_recordings/response-ceiling-piezo.ts';
import responseMicroclick from './_recordings/response-microclick.ts';

export default {
  id: 'short-range-proximity-pulse', name: "Short range proximity pulse", category: 'Sci-Fi & UI',
  tags: ["ui", "radar", "nearby", "proximity", "alarm"],
  loopable: false, durationSec: 0.331, mixRole: 'interface', targetRmsDbfs: -26,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseCeilingPiezo, responseMicroclick),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseCeilingPiezo, 0.0, 0.097, 0.78, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.113, 0.04, 0.25, 1, 10500, 0, 0.001, 0.022],
      [responseCeilingPiezo, 0.209, 0.072, 0.61, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
