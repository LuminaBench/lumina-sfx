import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalMud from './_recordings/natural-mud.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import mudSquelchFootstep from './_recordings/mud-squelch-footstep.ts';

export default {
  id: 'sticky-mud-stagger-and-catch', name: "Sticky mud stagger and catch", category: 'Footsteps & UI',
  tags: ["mud", "wet", "bog", "suction", "footstep", "stumble", "recovery", "trip"],
  loopable: false, durationSec: 0.976, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalMud, jacketMovementRustle, mudSquelchFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalMud, 0, 0.438, 0.67, 1.08, 9600, 0, 0.001, 0.022],
      [naturalMud, 0.146, 0.4979, 0.84, 0.95, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.229, 0.21, 0.19, 1.04, 5700, 0, 0.001, 0.022],
      [naturalMud, 0.406, 0.5198, 1, 0.91, 9600, 0, 0.001, 0.022],
      [mudSquelchFootstep, 0.536, 0.23, 0.18, 1.02, 5400, 0, 0.001, 0.045],
    ]);
  },
} satisfies SoundRecipe;
