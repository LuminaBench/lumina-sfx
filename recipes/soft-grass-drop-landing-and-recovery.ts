import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalGrass from './_recordings/natural-grass.ts';
import naturalGrassDrag from './_recordings/natural-grass-drag.ts';

export default {
  id: 'soft-grass-drop-landing-and-recovery', name: "Soft grass drop landing and recovery", category: 'Footsteps & UI',
  tags: ["grass", "turf", "meadow", "quiet", "footstep", "drop", "heavy", "landing", "stumble"],
  loopable: false, durationSec: 0.855, mixRole: 'foley', targetRmsDbfs: -29,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, naturalGrass, naturalGrassDrag),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.2, 0.22, 1.04, 5700, 0, 0.001, 0.022],
      [naturalGrass, 0.061, 0.4186, 1, 0.86, 9600, 0, 0.001, 0.022],
      [naturalGrass, 0.109, 0.383, 0.78, 0.94, 9600, 0, 0.001, 0.022],
      [naturalGrassDrag, 0.177, 0.29, 0.31, 0.9, 7200, 0, 0.001, 0.045],
      [naturalGrass, 0.469, 0.3364, 0.31, 1.07, 5400, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
