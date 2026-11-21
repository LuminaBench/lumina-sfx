import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGrass from './_recordings/natural-grass.ts';
import naturalGrassDrag from './_recordings/natural-grass-drag.ts';

export default {
  id: 'soft-grass-limping-gait', name: "Soft grass limping gait", category: 'Footsteps & UI',
  tags: ["grass", "turf", "meadow", "quiet", "footstep", "injured", "limp", "irregular", "walk", "cycle"],
  loopable: false, durationSec: 1.781, mixRole: 'foley', targetRmsDbfs: -32,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGrass, naturalGrassDrag),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalGrass, 0, 0.3871, 1, 0.93, 9600, 0, 0.001, 0.022],
      [naturalGrassDrag, 0.168, 0.27, 0.35, 0.86, 5600, 0, 0.001, 0.045],
      [naturalGrass, 0.346, 0.3333, 0.41, 1.08, 5200, 0, 0.001, 0.022],
      [naturalGrass, 1.047, 0.375, 0.9, 0.96, 9600, 0, 0.001, 0.022],
      [naturalGrassDrag, 1.214, 0.22, 0.31, 0.9, 5800, 0, 0.001, 0.045],
      [naturalGrass, 1.385, 0.3462, 0.37, 1.04, 5100, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
