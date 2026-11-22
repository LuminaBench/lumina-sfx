import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import twoFootLanding from './_recordings/two-foot-landing.ts';
import fieldCabbageChop from './_recordings/field-cabbage-chop.ts';
import dryBranchSnap from './_recordings/dry-branch-snap.ts';
import fieldPepperRip from './_recordings/field-pepper-rip.ts';

export default {
  id: 'heavy-crunch-under-falling-weight', name: "Heavy crunch under falling weight", category: 'Combat Foley',
  tags: ["bone", "crush", "wet", "body", "impact"],
  loopable: false, durationSec: 0.519, mixRole: 'impact', targetRmsDbfs: -22,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(twoFootLanding, fieldCabbageChop, dryBranchSnap, fieldPepperRip),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [twoFootLanding, 0.0, 0.22, 0.83, 1, 10500, 0, 0.001, 0.022],
      [fieldCabbageChop, 0.031, 0.12, 0.81, 1, 10500, 0, 0.001, 0.022],
      [dryBranchSnap, 0.087, 0.15, 0.65, 1, 10500, 0, 0.001, 0.022],
      [fieldPepperRip, 0.149, 0.32, 0.27, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
