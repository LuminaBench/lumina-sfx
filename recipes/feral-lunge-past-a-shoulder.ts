import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGrowl from './_recordings/natural-growl.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import twoFootLanding from './_recordings/two-foot-landing.ts';

export default {
  id: 'feral-lunge-past-a-shoulder', name: "Feral lunge past a shoulder", category: 'Zombies & Combat',
  tags: ["zombie", "creature", "lunge", "rush"],
  loopable: false, durationSec: 0.79, mixRole: 'voice', targetRmsDbfs: -22,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGrowl, jacketMovementRustle, twoFootLanding),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [naturalGrowl, 0.0, 0.74, 1.0, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.16, 0.29, 0.46, 1, 10500, 0, 0.001, 0.022],
      [twoFootLanding, 0.39, 0.23, 0.47, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
