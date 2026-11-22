import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldCabbageChop from './_recordings/field-cabbage-chop.ts';
import dryBranchSnap from './_recordings/dry-branch-snap.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'brittle-double-bone-snap', name: "Brittle double bone snap", category: 'Combat Foley',
  tags: ["bone", "crunch", "fracture", "foley"],
  loopable: false, durationSec: 0.369, mixRole: 'impact', targetRmsDbfs: -22,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldCabbageChop, dryBranchSnap, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [fieldCabbageChop, 0.0, 0.13, 0.81, 1, 10500, 0, 0.001, 0.022],
      [dryBranchSnap, 0.082, 0.21, 0.91, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.139, 0.18, 0.12, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
