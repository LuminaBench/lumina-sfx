import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGrowl from './_recordings/natural-growl.ts';
import naturalConcrete from './_recordings/natural-concrete.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'stalker-snarls-and-steps-forward', name: "Stalker snarls and steps forward", category: 'Zombies & Combat',
  tags: ["creature", "zombie", "threat", "attack"],
  loopable: false, durationSec: 0.83, mixRole: 'voice', targetRmsDbfs: -23,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGrowl, naturalConcrete, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [naturalGrowl, 0.0, 0.78, 0.98, 1, 10500, 0, 0.001, 0.022],
      [naturalConcrete, 0.44, 0.32, 0.34, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.56, 0.21, 0.18, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
