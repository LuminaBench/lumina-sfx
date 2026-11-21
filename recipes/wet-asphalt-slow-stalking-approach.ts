import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalAsphalt from './_recordings/natural-asphalt.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import waterDropsFromSpout from './_recordings/water-drops-from-spout.ts';

export default {
  id: 'wet-asphalt-slow-stalking-approach', name: "Wet asphalt slow stalking approach", category: 'Footsteps & UI',
  tags: ["rain", "street", "pavement", "footstep", "stealth", "approach", "sneak", "sequence"],
  loopable: false, durationSec: 2.081, mixRole: 'foley', targetRmsDbfs: -28,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalAsphalt, jacketMovementRustle, waterDropsFromSpout),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalAsphalt, 0, 0.325, 0.44, 1, 3600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.49, 0.21, 0.065, 1.04, 5700, 0, 0.001, 0.022],
      [naturalAsphalt, 0.744, 0.3125, 0.64, 1.04, 4600, 0, 0.001, 0.022],
      [naturalAsphalt, 1.601, 0.3283, 0.86, 0.99, 6100, 0, 0.001, 0.022],
      [waterDropsFromSpout, 1.746, 0.17, 0.11, 1.1, 4500, 0, 0.001, 0.045],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
