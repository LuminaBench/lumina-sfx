import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalConcrete from './_recordings/natural-concrete.ts';
import sneakerPivotSqueak from './_recordings/sneaker-pivot-squeak.ts';

export default {
  id: 'concrete-tight-turning-pivot', name: "Concrete tight turning pivot", category: 'Footsteps & UI',
  tags: ["pavement", "cement", "hard", "footstep", "pivot", "turn", "scrape"],
  loopable: false, durationSec: 0.756, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalConcrete, sneakerPivotSqueak),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalConcrete, 0, 0.22, 0.72, 1, 9600, 0, 0.001, 0.022],
      [sneakerPivotSqueak, 0.069, 0.35, 0.59, 1.07, 7800, 0, 0.001, 0.045],
      [naturalConcrete, 0.331, 0.3431, 0.37, 1.09, 6100, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
