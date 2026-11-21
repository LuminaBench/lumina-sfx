import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalGravel from './_recordings/natural-gravel.ts';
import naturalGravelDrag from './_recordings/natural-gravel-drag.ts';

export default {
  id: 'loose-gravel-drop-landing-and-recovery', name: "Loose gravel drop landing and recovery", category: 'Footsteps & UI',
  tags: ["grit", "pebbles", "trail", "footstep", "drop", "heavy", "landing", "stumble"],
  loopable: false, durationSec: 0.943, mixRole: 'foley', targetRmsDbfs: -24,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, naturalGravel, naturalGravelDrag),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.2, 0.36, 1.04, 5700, 0.023, 0.001, 0.022],
      [naturalGravel, 0.061, 0.4012, 1, 0.86, 9600, 0, 0.001, 0.022],
      [naturalGravel, 0.109, 0.367, 0.78, 0.94, 9600, 0, 0.001, 0.022],
      [naturalGravelDrag, 0.177, 0.29, 0.31, 0.9, 7200, 0, 0.001, 0.045],
      [naturalGravel, 0.469, 0.3224, 0.31, 1.07, 5400, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
