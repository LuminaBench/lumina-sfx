import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalMud from './_recordings/natural-mud.ts';
import mudSquelchFootstep from './_recordings/mud-squelch-footstep.ts';

export default {
  id: 'sticky-mud-limping-gait', name: "Sticky mud limping gait", category: 'Footsteps & UI',
  tags: ["mud", "wet", "bog", "suction", "footstep", "injured", "limp", "irregular", "walk", "cycle"],
  loopable: false, durationSec: 1.89, mixRole: 'foley', targetRmsDbfs: -28,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalMud, mudSquelchFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalMud, 0, 0.5086, 1, 0.93, 9600, 0, 0.001, 0.022],
      [mudSquelchFootstep, 0.168, 0.27, 0.35, 0.86, 5600, 0, 0.001, 0.045],
      [naturalMud, 0.346, 0.438, 0.41, 1.08, 5200, 0, 0.001, 0.022],
      [naturalMud, 1.047, 0.4927, 0.9, 0.96, 9600, 0, 0.001, 0.022],
      [mudSquelchFootstep, 1.214, 0.22, 0.31, 0.9, 5800, 0, 0.001, 0.045],
      [naturalMud, 1.385, 0.4548, 0.37, 1.04, 5100, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
