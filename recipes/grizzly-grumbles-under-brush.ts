import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalBear from './_recordings/natural-bear.ts';
import dryVineBrush from './_recordings/dry-vine-brush.ts';
import dryBranchSnap from './_recordings/dry-branch-snap.ts';

export default {
  id: 'grizzly-grumbles-under-brush', name: "Grizzly grumbles under brush", category: 'Animals',
  tags: ["bear", "grizzly", "growl", "brush"],
  loopable: false, durationSec: 2.731, mixRole: 'voice', targetRmsDbfs: -24,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalBear, dryVineBrush, dryBranchSnap),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalBear, 0.0, 2.54, 0.95, 1, 10500, 0, 0.001, 0.022],
      [dryVineBrush, 0.31, 0.44, 0.19, 1, 10500, 0, 0.001, 0.022],
      [dryBranchSnap, 1.31, 0.2, 0.13, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.073, 0.141], send: 0.13, dampingHz: 2100 });
  },
} satisfies SoundRecipe;
