import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalPuddles from './_recordings/natural-puddles.ts';
import shallowWaterFootstep from './_recordings/shallow-water-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'shallow-puddles-braking-skid-to-a-stop', name: "Shallow puddles braking skid to a stop", category: 'Footsteps & UI',
  tags: ["water", "wet", "splash", "puddle", "footstep", "stop", "sprint", "brake", "scuff"],
  loopable: false, durationSec: 1.137, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalPuddles, shallowWaterFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalPuddles, 0, 0.22, 0.81, 1.1, 9600, 0, 0.001, 0.022],
      [naturalPuddles, 0.203, 0.7819, 0.95, 0.94, 9600, 0, 0.001, 0.022],
      [shallowWaterFootstep, 0.246, 0.44, 0.64, 0.82, 8800, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.287, 0.21, 0.12, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
