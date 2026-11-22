import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import twoFootLanding from './_recordings/two-foot-landing.ts';
import slattedCrateSettle from './_recordings/slatted-crate-settle.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'shoulder-checks-a-wooden-jamb', name: "Shoulder checks a wooden jamb", category: 'Combat Foley',
  tags: ["body", "impact", "shoulder", "door", "combat"],
  loopable: false, durationSec: 0.41, mixRole: 'impact', targetRmsDbfs: -22,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(twoFootLanding, slattedCrateSettle, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [twoFootLanding, 0.0, 0.24, 0.84, 1, 10500, 0, 0.001, 0.022],
      [slattedCrateSettle, 0.018, 0.31, 0.62, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.082, 0.23, 0.23, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
