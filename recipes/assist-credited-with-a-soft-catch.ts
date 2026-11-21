import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseButton from './_recordings/response-button.ts';
import energyCellSeating from './_recordings/energy-cell-seating.ts';

export default {
  id: 'assist-credited-with-a-soft-catch', name: "Assist credited with a soft catch", category: 'Sci-Fi & UI',
  tags: ["ui", "combat", "assist", "team"],
  loopable: false, durationSec: 0.193, mixRole: 'interface', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseButton, energyCellSeating),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseButton, 0.0, 0.073, 0.68, 1, 10500, 0, 0.001, 0.022],
      [energyCellSeating, 0.043, 0.1, 0.33, 1.03, 5600.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
