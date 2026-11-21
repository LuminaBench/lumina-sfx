import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalMud from './_recordings/natural-mud.ts';
import mudSquelchFootstep from './_recordings/mud-squelch-footstep.ts';

export default {
  id: 'sticky-mud-short-hop-landing', name: "Sticky mud short hop landing", category: 'Footsteps & UI',
  tags: ["mud", "wet", "bog", "suction", "footstep", "jump", "landing", "hop"],
  loopable: false, durationSec: 0.617, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, naturalMud, mudSquelchFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.14, 0.16, 1.04, 5700, 0, 0.001, 0.022],
      [naturalMud, 0.084, 0.4827, 1, 0.98, 9600, 0, 0.001, 0.022],
      [naturalMud, 0.118, 0.438, 0.54, 1.08, 6200, 0, 0.001, 0.022],
      [mudSquelchFootstep, 0.177, 0.18, 0.14, 1.1, 7500, 0, 0.001, 0.045],
    ]);
  },
} satisfies SoundRecipe;
