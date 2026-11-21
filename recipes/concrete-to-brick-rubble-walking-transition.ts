import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalConcrete from './_recordings/natural-concrete.ts';
import mixedRubbleFootstep from './_recordings/mixed-rubble-footstep.ts';
import rockPileImpact from './_recordings/rock-pile-impact.ts';

export default {
  id: 'concrete-to-brick-rubble-walking-transition', name: "Concrete to brick rubble walking transition", category: 'Footsteps & UI',
  tags: ["pavement", "cement", "hard", "brick", "rubble", "stones", "debris", "footstep", "crossing", "threshold", "transition", "walk"],
  loopable: false, durationSec: 2.0, mixRole: 'foley', targetRmsDbfs: -24,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalConcrete, mixedRubbleFootstep, rockPileImpact),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalConcrete, 0, 0.3778, 0.66, 0.99, 7200, 0, 0.001, 0.022],
      [naturalConcrete, 0.465, 0.374, 0.78, 1, 10500, 0, 0.001, 0.022],
      [mixedRubbleFootstep, 0.94, 0.519, 1, 1, 10500, 0, 0.001, 0.022],
      [rockPileImpact, 1.04, 0.16, 0.1, 1.07, 5900, 0, 0.001, 0.022],
      [mixedRubbleFootstep, 1.424, 0.4943, 0.82, 1.05, 10500, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
