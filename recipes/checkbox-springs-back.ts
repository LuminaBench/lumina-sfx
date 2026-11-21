import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import energyCellSeating from './_recordings/energy-cell-seating.ts';
import responseMicroclick from './_recordings/response-microclick.ts';

export default {
  id: 'checkbox-springs-back', name: "Checkbox springs back", category: 'Sci-Fi & UI',
  tags: ["ui", "checkbox", "unchecked", "toggle", "off"],
  loopable: false, durationSec: 0.168, mixRole: 'interface', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(energyCellSeating, responseMicroclick),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [energyCellSeating, 0.0, 0.09, 0.46, 1.12, 5700.0, 0, 0.001, 0.022],
      [responseMicroclick, 0.073, 0.045, 0.72, 1.04, 7200.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
