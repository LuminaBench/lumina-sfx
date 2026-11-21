import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalAsphalt from './_recordings/natural-asphalt.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import waterDropsFromSpout from './_recordings/water-drops-from-spout.ts';

export default {
  id: 'wet-asphalt-stagger-and-catch', name: "Wet asphalt stagger and catch", category: 'Footsteps & UI',
  tags: ["rain", "street", "pavement", "footstep", "stumble", "recovery", "trip"],
  loopable: false, durationSec: 0.918, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalAsphalt, jacketMovementRustle, waterDropsFromSpout),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalAsphalt, 0, 0.3009, 0.67, 1.08, 9600, 0, 0.001, 0.022],
      [naturalAsphalt, 0.146, 0.3421, 0.84, 0.95, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.229, 0.21, 0.19, 1.04, 5700, 0, 0.001, 0.022],
      [naturalAsphalt, 0.406, 0.3571, 1, 0.91, 9600, 0, 0.001, 0.022],
      [waterDropsFromSpout, 0.536, 0.23, 0.18, 1.02, 5400, 0, 0.001, 0.045],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
