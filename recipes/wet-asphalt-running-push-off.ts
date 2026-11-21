import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalAsphalt from './_recordings/natural-asphalt.ts';
import waterDropsFromSpout from './_recordings/water-drops-from-spout.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'wet-asphalt-running-push-off', name: "Wet asphalt running push off", category: 'Footsteps & UI',
  tags: ["rain", "street", "pavement", "footstep", "jump", "takeoff", "toe", "burst"],
  loopable: false, durationSec: 0.453, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalAsphalt, waterDropsFromSpout, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalAsphalt, 0, 0.17, 0.79, 1.11, 9600, 0, 0.001, 0.022],
      [waterDropsFromSpout, 0.098, 0.19, 0.31, 1.23, 8100, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.091, 0.21, 0.14, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
