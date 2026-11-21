import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalAsphalt from './_recordings/natural-asphalt.ts';
import waterDropsFromSpout from './_recordings/water-drops-from-spout.ts';

export default {
  id: 'wet-asphalt-tight-turning-pivot', name: "Wet asphalt tight turning pivot", category: 'Footsteps & UI',
  tags: ["rain", "street", "pavement", "footstep", "pivot", "turn", "scrape"],
  loopable: false, durationSec: 0.781, mixRole: 'foley', targetRmsDbfs: -27,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalAsphalt, waterDropsFromSpout),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalAsphalt, 0, 0.22, 0.72, 1, 9600, 0, 0.001, 0.022],
      [waterDropsFromSpout, 0.069, 0.35, 0.59, 1.07, 7800, 0, 0.001, 0.045],
      [naturalAsphalt, 0.331, 0.2982, 0.37, 1.09, 6100, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
