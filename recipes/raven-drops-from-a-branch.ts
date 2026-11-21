import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalRaven from './_recordings/natural-raven.ts';
import fieldWings from './_recordings/field-wings.ts';
import dryBranchSnap from './_recordings/dry-branch-snap.ts';

export default {
  id: 'raven-drops-from-a-branch', name: "Raven drops from a branch", category: 'Animals',
  tags: ["raven", "flight", "wing", "branch"],
  loopable: false, durationSec: 1.201, mixRole: 'voice', targetRmsDbfs: -24,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalRaven, fieldWings, dryBranchSnap),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalRaven, 0.0, 0.67, 0.96, 1, 10500, 0, 0.001, 0.022],
      [fieldWings, 0.31, 0.7, 0.74, 1, 10500, 0, 0.001, 0.022],
      [dryBranchSnap, 0.38, 0.16, 0.14, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.073, 0.141], send: 0.13, dampingHz: 2100 });
  },
} satisfies SoundRecipe;
