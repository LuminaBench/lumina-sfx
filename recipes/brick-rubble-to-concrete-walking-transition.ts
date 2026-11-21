import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import mixedRubbleFootstep from './_recordings/mixed-rubble-footstep.ts';
import naturalConcrete from './_recordings/natural-concrete.ts';
import sneakerPivotSqueak from './_recordings/sneaker-pivot-squeak.ts';

export default {
  id: 'brick-rubble-to-concrete-walking-transition', name: "Brick rubble to concrete walking transition", category: 'Footsteps & UI',
  tags: ["brick", "rubble", "stones", "debris", "pavement", "cement", "hard", "footstep", "crossing", "threshold", "transition", "walk"],
  loopable: false, durationSec: 1.862, mixRole: 'foley', targetRmsDbfs: -24,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(mixedRubbleFootstep, naturalConcrete, sneakerPivotSqueak),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [mixedRubbleFootstep, 0, 0.5242, 0.66, 0.99, 7200, 0, 0.001, 0.022],
      [mixedRubbleFootstep, 0.465, 0.519, 0.78, 1, 10500, 0, 0.001, 0.022],
      [naturalConcrete, 0.94, 0.374, 1, 1, 10500, 0, 0.001, 0.022],
      [sneakerPivotSqueak, 1.04, 0.16, 0.1, 1.07, 5900, 0, 0.001, 0.022],
      [naturalConcrete, 1.424, 0.3562, 0.82, 1.05, 10500, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
