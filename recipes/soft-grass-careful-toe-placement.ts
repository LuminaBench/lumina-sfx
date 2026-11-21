import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGrass from './_recordings/natural-grass.ts';
import naturalGrassDrag from './_recordings/natural-grass-drag.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'soft-grass-careful-toe-placement', name: "Soft grass careful toe placement", category: 'Footsteps & UI',
  tags: ["grass", "turf", "meadow", "quiet", "footstep", "sneak", "tiptoe", "stealth"],
  loopable: false, durationSec: 0.314, mixRole: 'foley', targetRmsDbfs: -34,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGrass, naturalGrassDrag, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalGrass, 0, 0.2, 0.7, 1.08, 5400, 0, 0.001, 0.022],
      [naturalGrassDrag, 0.104, 0.16, 0.1, 1.05, 3600, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.025, 0.21, 0.055, 1.04, 5700, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
