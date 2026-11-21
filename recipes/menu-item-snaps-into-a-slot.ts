import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseButton from './_recordings/response-button.ts';
import energyCellSeating from './_recordings/energy-cell-seating.ts';

export default {
  id: 'menu-item-snaps-into-a-slot', name: "Menu item snaps into a slot", category: 'Sci-Fi & UI',
  tags: ["ui", "menu", "drop", "drag", "snap", "slot"],
  loopable: false, durationSec: 0.204, mixRole: 'interface', targetRmsDbfs: -25,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseButton, energyCellSeating),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseButton, 0.0, 0.084, 0.65, 1, 10500, 0, 0.001, 0.022],
      [energyCellSeating, 0.043, 0.111, 0.63, 1.19, 7900.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
