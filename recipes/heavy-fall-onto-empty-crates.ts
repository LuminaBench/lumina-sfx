import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import twoFootLanding from './_recordings/two-foot-landing.ts';
import slattedCrateSettle from './_recordings/slatted-crate-settle.ts';
import barnTimberCreak from './_recordings/barn-timber-creak.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'heavy-fall-onto-empty-crates', name: "Heavy fall onto empty crates", category: 'Zombies & Combat',
  tags: ["body", "fall", "wooden", "crate", "impact"],
  loopable: false, durationSec: 0.818, mixRole: 'impact', targetRmsDbfs: -21,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(twoFootLanding, slattedCrateSettle, barnTimberCreak, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [twoFootLanding, 0.0, 0.25, 0.96, 1, 10500, 0, 0.001, 0.022],
      [slattedCrateSettle, 0.032, 0.34, 0.78, 1, 10500, 0, 0.001, 0.022],
      [barnTimberCreak, 0.094, 0.61, 0.26, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.29, 0.23, 0.16, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.024, 0.064], send: 0.125, dampingHz: 3300 });
  },
} satisfies SoundRecipe;
