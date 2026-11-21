import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalAsphalt from './_recordings/natural-asphalt.ts';
import waterDropsFromSpout from './_recordings/water-drops-from-spout.ts';

export default {
  id: 'wet-asphalt-limping-gait', name: "Wet asphalt limping gait", category: 'Footsteps & UI',
  tags: ["rain", "street", "pavement", "footstep", "injured", "limp", "irregular", "walk", "cycle"],
  loopable: false, durationSec: 1.849, mixRole: 'foley', targetRmsDbfs: -27,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalAsphalt, waterDropsFromSpout),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalAsphalt, 0, 0.3495, 1, 0.93, 9600, 0, 0.001, 0.022],
      [waterDropsFromSpout, 0.168, 0.27, 0.35, 0.86, 5600, 0, 0.001, 0.045],
      [naturalAsphalt, 0.346, 0.3009, 0.41, 1.08, 5200, 0, 0.001, 0.022],
      [naturalAsphalt, 1.047, 0.3385, 0.9, 0.96, 9600, 0, 0.001, 0.022],
      [waterDropsFromSpout, 1.214, 0.22, 0.31, 0.9, 5800, 0, 0.001, 0.045],
      [naturalAsphalt, 1.385, 0.3125, 0.37, 1.04, 5100, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
