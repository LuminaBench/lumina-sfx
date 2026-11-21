import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalMud from './_recordings/natural-mud.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'sticky-mud-hurried-retreat', name: "Sticky mud hurried retreat", category: 'Footsteps & UI',
  tags: ["mud", "wet", "bog", "suction", "footstep", "retreat", "run", "recede", "escape"],
  loopable: false, durationSec: 1.799, mixRole: 'foley', targetRmsDbfs: -27,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalMud, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalMud, 0, 0.4462, 1, 1.06, 9600, 0, 0.001, 0.022],
      [naturalMud, 0.238, 0.4548, 0.79, 1.04, 7400, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.327, 0.21, 0.14, 1.04, 5700, 0, 0.001, 0.022],
      [naturalMud, 0.557, 0.4339, 0.54, 1.09, 5500, 0, 0.001, 0.022],
      [naturalMud, 0.902, 0.4548, 0.32, 1.04, 3700, 0, 0.001, 0.022],
      [naturalMud, 1.285, 0.4637, 0.17, 1.02, 2400, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
