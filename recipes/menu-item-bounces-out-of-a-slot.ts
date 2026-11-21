import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import energyCellSeating from './_recordings/energy-cell-seating.ts';
import responseButton from './_recordings/response-button.ts';
import responseMicroclick from './_recordings/response-microclick.ts';

export default {
  id: 'menu-item-bounces-out-of-a-slot', name: "Menu item bounces out of a slot", category: 'Sci-Fi & UI',
  tags: ["ui", "menu", "invalid", "drop", "reject"],
  loopable: false, durationSec: 0.274, mixRole: 'interface', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(energyCellSeating, responseButton, responseMicroclick),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [energyCellSeating, 0.0, 0.091, 0.61, 1, 10500, 0, 0.001, 0.022],
      [responseButton, 0.088, 0.073, 0.47, 0.91, 3950.0, 0, 0.001, 0.022],
      [responseMicroclick, 0.184, 0.04, 0.24, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
