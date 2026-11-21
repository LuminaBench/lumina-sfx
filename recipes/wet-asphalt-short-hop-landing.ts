import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalAsphalt from './_recordings/natural-asphalt.ts';
import waterDropsFromSpout from './_recordings/water-drops-from-spout.ts';

export default {
  id: 'wet-asphalt-short-hop-landing', name: "Wet asphalt short hop landing", category: 'Footsteps & UI',
  tags: ["rain", "street", "pavement", "footstep", "jump", "landing", "hop"],
  loopable: false, durationSec: 0.571, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, naturalAsphalt, waterDropsFromSpout),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.14, 0.16, 1.04, 5700, 0, 0.001, 0.022],
      [naturalAsphalt, 0.084, 0.3316, 1, 0.98, 9600, 0, 0.001, 0.022],
      [naturalAsphalt, 0.118, 0.3009, 0.54, 1.08, 6200, 0, 0.001, 0.022],
      [waterDropsFromSpout, 0.177, 0.18, 0.14, 1.1, 7500, 0, 0.001, 0.045],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
