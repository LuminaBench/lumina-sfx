import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'jacket-sleeve-slides-off-wrist', name: "Jacket sleeve slides off wrist", category: 'Props & Interactions',
  tags: ["clothing", "jacket", "sleeve", "remove"],
  loopable: false, durationSec: 0.55, mixRole: 'detail', targetRmsDbfs: -30,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [jacketMovementRustle, 0.0, 0.31, 0.9, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.26, 0.24, 0.53, 1.17, 5500.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
