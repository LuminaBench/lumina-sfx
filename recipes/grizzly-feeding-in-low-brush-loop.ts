import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldLeafBed from './_recordings/field-leaf-bed.ts';
import naturalBear from './_recordings/natural-bear.ts';
import dryBranchSnap from './_recordings/dry-branch-snap.ts';

export default {
  id: 'grizzly-feeding-in-low-brush-loop', name: "Grizzly feeding in low brush loop", category: 'Animals',
  tags: ["bear", "growl", "feeding", "brush", "loop"],
  loopable: true, durationSec: 4.5, mixRole: 'ambience', targetRmsDbfs: -27,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldLeafBed, naturalBear, dryBranchSnap),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldLeafBed, 0, 5.0, 0.17, 1, 4700, 5.0, 0.001, 0.015],
      [naturalBear, 0.26, 2.58, 0.83, 1, 10500, 0, 0.001, 0.022],
      [dryBranchSnap, 2.01, 0.19, 0.14, 1, 10500, 0, 0.001, 0.022],
      [naturalBear, 3.16, 1.28, 0.45, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
