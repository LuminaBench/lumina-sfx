import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalConcrete from './_recordings/natural-concrete.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import sneakerPivotSqueak from './_recordings/sneaker-pivot-squeak.ts';

export default {
  id: 'concrete-slow-stalking-approach', name: "Concrete slow stalking approach", category: 'Footsteps & UI',
  tags: ["pavement", "cement", "hard", "footstep", "stealth", "approach", "sneak", "sequence"],
  loopable: false, durationSec: 2.061, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalConcrete, jacketMovementRustle, sneakerPivotSqueak),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalConcrete, 0, 0.374, 0.44, 1, 3600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.49, 0.21, 0.065, 1.04, 5700, 0, 0.001, 0.022],
      [naturalConcrete, 0.744, 0.3596, 0.64, 1.04, 4600, 0, 0.001, 0.022],
      [naturalConcrete, 1.601, 0.3778, 0.86, 0.99, 6100, 0, 0.001, 0.022],
      [sneakerPivotSqueak, 1.746, 0.17, 0.11, 1.1, 4500, 0, 0.001, 0.045],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
