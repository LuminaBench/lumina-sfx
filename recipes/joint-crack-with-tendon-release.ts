import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import dryBranchSnap from './_recordings/dry-branch-snap.ts';
import fieldLeafTear from './_recordings/field-leaf-tear.ts';
import fieldPepperRip from './_recordings/field-pepper-rip.ts';

export default {
  id: 'joint-crack-with-tendon-release', name: "Joint crack with tendon release", category: 'Combat Foley',
  tags: ["bone", "joint", "crack", "snap", "foley"],
  loopable: false, durationSec: 0.392, mixRole: 'impact', targetRmsDbfs: -23,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(dryBranchSnap, fieldLeafTear, fieldPepperRip),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [dryBranchSnap, 0.0, 0.13, 0.95, 1, 10500, 0, 0.001, 0.022],
      [fieldLeafTear, 0.031, 0.28, 0.43, 1, 10500, 0, 0.001, 0.022],
      [fieldPepperRip, 0.102, 0.24, 0.31, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
