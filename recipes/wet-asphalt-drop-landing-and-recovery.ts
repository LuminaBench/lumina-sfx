import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalAsphalt from './_recordings/natural-asphalt.ts';
import waterDropsFromSpout from './_recordings/water-drops-from-spout.ts';

export default {
  id: 'wet-asphalt-drop-landing-and-recovery', name: "Wet asphalt drop landing and recovery", category: 'Footsteps & UI',
  tags: ["rain", "street", "pavement", "footstep", "drop", "heavy", "landing", "stumble"],
  loopable: false, durationSec: 0.925, mixRole: 'foley', targetRmsDbfs: -24,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, naturalAsphalt, waterDropsFromSpout),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.2, 0.22, 1.04, 5700, 0, 0.001, 0.022],
      [naturalAsphalt, 0.061, 0.3779, 1, 0.86, 9600, 0, 0.001, 0.022],
      [naturalAsphalt, 0.109, 0.3457, 0.78, 0.94, 9600, 0, 0.001, 0.022],
      [waterDropsFromSpout, 0.177, 0.29, 0.31, 0.9, 7200, 0, 0.001, 0.045],
      [naturalAsphalt, 0.469, 0.3037, 0.31, 1.07, 5400, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
