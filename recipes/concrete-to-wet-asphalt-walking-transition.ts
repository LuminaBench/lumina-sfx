import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalConcrete from './_recordings/natural-concrete.ts';
import naturalAsphalt from './_recordings/natural-asphalt.ts';
import waterDropsFromSpout from './_recordings/water-drops-from-spout.ts';

export default {
  id: 'concrete-to-wet-asphalt-walking-transition', name: "Concrete to wet asphalt walking transition", category: 'Footsteps & UI',
  tags: ["pavement", "cement", "hard", "rain", "street", "footstep", "crossing", "threshold", "transition", "walk"],
  loopable: false, durationSec: 1.885, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalConcrete, naturalAsphalt, waterDropsFromSpout),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalConcrete, 0, 0.3778, 0.66, 0.99, 7200, 0, 0.001, 0.022],
      [naturalConcrete, 0.465, 0.374, 0.78, 1, 10500, 0, 0.001, 0.022],
      [naturalAsphalt, 0.94, 0.325, 1, 1, 10500, 0, 0.001, 0.022],
      [waterDropsFromSpout, 1.04, 0.16, 0.1, 1.07, 5900, 0, 0.001, 0.022],
      [naturalAsphalt, 1.424, 0.3095, 0.82, 1.05, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
