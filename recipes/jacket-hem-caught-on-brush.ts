import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import dryVineBrush from './_recordings/dry-vine-brush.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import dryBranchSnap from './_recordings/dry-branch-snap.ts';

export default {
  id: 'jacket-hem-caught-on-brush', name: "Jacket hem caught on brush", category: 'Props & Interactions',
  tags: ["clothing", "cloth", "snag", "foliage"],
  loopable: false, durationSec: 0.56, mixRole: 'detail', targetRmsDbfs: -29,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(dryVineBrush, jacketMovementRustle, dryBranchSnap),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [dryVineBrush, 0.0, 0.32, 0.56, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.14, 0.26, 0.77, 1, 10500, 0, 0.001, 0.022],
      [dryBranchSnap, 0.41, 0.1, 0.18, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
