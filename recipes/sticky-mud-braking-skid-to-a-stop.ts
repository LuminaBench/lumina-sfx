import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalMud from './_recordings/natural-mud.ts';
import mudSquelchFootstep from './_recordings/mud-squelch-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'sticky-mud-braking-skid-to-a-stop', name: "Sticky mud braking skid to a stop", category: 'Footsteps & UI',
  tags: ["mud", "wet", "bog", "suction", "footstep", "stop", "sprint", "brake", "scuff"],
  loopable: false, durationSec: 0.756, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalMud, mudSquelchFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalMud, 0, 0.22, 0.81, 1.1, 9600, 0, 0.001, 0.022],
      [naturalMud, 0.203, 0.5032, 0.95, 0.94, 9600, 0, 0.001, 0.022],
      [mudSquelchFootstep, 0.246, 0.44, 0.64, 0.82, 8800, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.287, 0.21, 0.12, 1.04, 5700, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
