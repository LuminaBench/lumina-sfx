import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGrass from './_recordings/natural-grass.ts';
import naturalGrassDrag from './_recordings/natural-grass-drag.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'soft-grass-braking-skid-to-a-stop', name: "Soft grass braking skid to a stop", category: 'Footsteps & UI',
  tags: ["grass", "turf", "meadow", "quiet", "footstep", "stop", "sprint", "brake", "scuff"],
  loopable: false, durationSec: 0.736, mixRole: 'foley', targetRmsDbfs: -30,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGrass, naturalGrassDrag, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalGrass, 0, 0.22, 0.81, 1.1, 9600, 0, 0.001, 0.022],
      [naturalGrass, 0.203, 0.383, 0.95, 0.94, 9600, 0, 0.001, 0.022],
      [naturalGrassDrag, 0.246, 0.44, 0.64, 0.82, 8800, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.287, 0.21, 0.12, 1.04, 5700, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
