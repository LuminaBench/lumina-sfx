import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';

export default {
  id: 'jacket-pulled-over-both-shoulders', name: "Jacket pulled over both shoulders", category: 'Props & Interactions',
  tags: ["clothing", "jacket", "equip", "shoulder"],
  loopable: false, durationSec: 0.74, mixRole: 'detail', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, leatherStrapFlex),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [jacketMovementRustle, 0.0, 0.27, 0.7, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.28, 0.32, 0.89, 1, 10500, 0, 0.001, 0.022],
      [leatherStrapFlex, 0.51, 0.18, 0.14, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
