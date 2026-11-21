import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalMud from './_recordings/natural-mud.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'sticky-mud-walk-into-a-jog', name: "Sticky mud walk into a jog", category: 'Footsteps & UI',
  tags: ["mud", "wet", "bog", "suction", "footstep", "walk", "jog", "accelerate", "gait"],
  loopable: false, durationSec: 2.216, mixRole: 'foley', targetRmsDbfs: -27,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalMud, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalMud, 0, 0.4827, 0.71, 0.98, 9600, 0, 0.001, 0.022],
      [naturalMud, 0.571, 0.4637, 0.74, 1.02, 9600, 0, 0.001, 0.022],
      [naturalMud, 1.04, 0.473, 0.82, 1, 9600, 0, 0.001, 0.022],
      [naturalMud, 1.402, 0.4462, 0.94, 1.06, 9600, 0, 0.001, 0.022],
      [naturalMud, 1.711, 0.4548, 1, 1.04, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 1.78, 0.21, 0.11, 1.04, 5700, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
