import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalConcrete from './_recordings/natural-concrete.ts';
import twoFootLanding from './_recordings/two-foot-landing.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'knees-strike-and-hands-catch', name: "Knees strike and hands catch", category: 'Combat Foley',
  tags: ["body", "fall", "kneeling", "landing"],
  loopable: false, durationSec: 0.612, mixRole: 'impact', targetRmsDbfs: -23,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalConcrete, twoFootLanding, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [naturalConcrete, 0.0, 0.25, 0.69, 1, 10500, 0, 0.001, 0.022],
      [naturalConcrete, 0.057, 0.19, 0.52, 1, 10500, 0, 0.001, 0.022],
      [twoFootLanding, 0.242, 0.22, 0.82, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.29, 0.24, 0.2, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
