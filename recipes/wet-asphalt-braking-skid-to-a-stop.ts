import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalAsphalt from './_recordings/natural-asphalt.ts';
import waterDropsFromSpout from './_recordings/water-drops-from-spout.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'wet-asphalt-braking-skid-to-a-stop', name: "Wet asphalt braking skid to a stop", category: 'Footsteps & UI',
  tags: ["rain", "street", "pavement", "footstep", "stop", "sprint", "brake", "scuff"],
  loopable: false, durationSec: 0.838, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalAsphalt, waterDropsFromSpout, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalAsphalt, 0, 0.22, 0.81, 1.1, 9600, 0, 0.001, 0.022],
      [naturalAsphalt, 0.203, 0.3457, 0.95, 0.94, 9600, 0, 0.001, 0.022],
      [waterDropsFromSpout, 0.246, 0.44, 0.64, 0.82, 8800, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.287, 0.21, 0.12, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
