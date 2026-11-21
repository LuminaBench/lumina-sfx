import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGravel from './_recordings/natural-gravel.ts';
import naturalGravelDrag from './_recordings/natural-gravel-drag.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'loose-gravel-braking-skid-to-a-stop', name: "Loose gravel braking skid to a stop", category: 'Footsteps & UI',
  tags: ["grit", "pebbles", "trail", "footstep", "stop", "sprint", "brake", "scuff"],
  loopable: false, durationSec: 0.838, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGravel, naturalGravelDrag, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalGravel, 0, 0.22, 0.81, 1.1, 9600, 0, 0.001, 0.022],
      [naturalGravel, 0.203, 0.367, 0.95, 0.94, 9600, 0, 0.001, 0.022],
      [naturalGravelDrag, 0.246, 0.44, 0.64, 0.82, 8800, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.287, 0.21, 0.12, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
