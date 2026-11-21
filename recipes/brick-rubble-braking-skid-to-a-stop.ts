import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import mixedRubbleFootstep from './_recordings/mixed-rubble-footstep.ts';
import rockPileImpact from './_recordings/rock-pile-impact.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'brick-rubble-braking-skid-to-a-stop', name: "Brick rubble braking skid to a stop", category: 'Footsteps & UI',
  tags: ["brick", "rubble", "stones", "debris", "footstep", "stop", "sprint", "brake", "scuff"],
  loopable: false, durationSec: 0.837, mixRole: 'foley', targetRmsDbfs: -24,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(mixedRubbleFootstep, rockPileImpact, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [mixedRubbleFootstep, 0, 0.22, 0.81, 1.1, 9600, 0, 0.001, 0.022],
      [mixedRubbleFootstep, 0.203, 0.5521, 0.95, 0.94, 9600, 0, 0.001, 0.022],
      [rockPileImpact, 0.246, 0.44, 0.64, 0.82, 8800, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.287, 0.21, 0.12, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
