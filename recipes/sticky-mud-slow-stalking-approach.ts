import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalMud from './_recordings/natural-mud.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import mudSquelchFootstep from './_recordings/mud-squelch-footstep.ts';

export default {
  id: 'sticky-mud-slow-stalking-approach', name: "Sticky mud slow stalking approach", category: 'Footsteps & UI',
  tags: ["mud", "wet", "bog", "suction", "footstep", "stealth", "approach", "sneak", "sequence"],
  loopable: false, durationSec: 2.129, mixRole: 'foley', targetRmsDbfs: -29,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalMud, jacketMovementRustle, mudSquelchFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalMud, 0, 0.473, 0.44, 1, 3600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.49, 0.21, 0.065, 1.04, 5700, 0, 0.001, 0.022],
      [naturalMud, 0.744, 0.4548, 0.64, 1.04, 4600, 0, 0.001, 0.022],
      [naturalMud, 1.601, 0.4778, 0.86, 0.99, 6100, 0, 0.001, 0.022],
      [mudSquelchFootstep, 1.746, 0.17, 0.11, 1.1, 4500, 0, 0.001, 0.045],
    ]);
  },
} satisfies SoundRecipe;
