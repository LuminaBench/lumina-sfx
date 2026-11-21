import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalMud from './_recordings/natural-mud.ts';
import mudSquelchFootstep from './_recordings/mud-squelch-footstep.ts';

export default {
  id: 'sticky-mud-drop-landing-and-recovery', name: "Sticky mud drop landing and recovery", category: 'Footsteps & UI',
  tags: ["mud", "wet", "bog", "suction", "footstep", "drop", "heavy", "landing", "stumble"],
  loopable: false, durationSec: 0.961, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, naturalMud, mudSquelchFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.2, 0.22, 1.04, 5700, 0, 0.001, 0.022],
      [naturalMud, 0.061, 0.55, 1, 0.86, 9600, 0, 0.001, 0.022],
      [naturalMud, 0.109, 0.5032, 0.78, 0.94, 9600, 0, 0.001, 0.022],
      [mudSquelchFootstep, 0.177, 0.29, 0.31, 0.9, 7200, 0, 0.001, 0.045],
      [naturalMud, 0.469, 0.4421, 0.31, 1.07, 5400, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
