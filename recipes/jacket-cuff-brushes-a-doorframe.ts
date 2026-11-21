import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import slattedCrateSettle from './_recordings/slatted-crate-settle.ts';

export default {
  id: 'jacket-cuff-brushes-a-doorframe', name: "Jacket cuff brushes a doorframe", category: 'Props & Interactions',
  tags: ["clothing", "cloth", "movement", "contact"],
  loopable: false, durationSec: 0.34, mixRole: 'detail', targetRmsDbfs: -31,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, slattedCrateSettle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [jacketMovementRustle, 0.0, 0.29, 0.88, 1, 10500, 0, 0.001, 0.022],
      [slattedCrateSettle, 0.15, 0.1, 0.08, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
