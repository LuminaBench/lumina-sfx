import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseMicroclick from './_recordings/response-microclick.ts';
import energyCellSeating from './_recordings/energy-cell-seating.ts';

export default {
  id: 'checkbox-sets-with-a-spring', name: "Checkbox sets with a spring", category: 'Sci-Fi & UI',
  tags: ["ui", "checkbox", "checked", "toggle", "on"],
  loopable: false, durationSec: 0.192, mixRole: 'interface', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseMicroclick, energyCellSeating),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseMicroclick, 0.0, 0.043, 0.71, 1, 10500, 0, 0.001, 0.022],
      [energyCellSeating, 0.037, 0.105, 0.51, 1.25, 8800.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
