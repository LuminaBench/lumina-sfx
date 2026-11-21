import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalMetal from './_recordings/natural-metal.ts';
import metalDeckFootstep from './_recordings/metal-deck-footstep.ts';

export default {
  id: 'hollow-metal-limping-gait', name: "Hollow metal limping gait", category: 'Footsteps & UI',
  tags: ["catwalk", "steel", "metal", "footstep", "injured", "limp", "irregular", "walk", "cycle"],
  loopable: false, durationSec: 2.092, mixRole: 'foley', targetRmsDbfs: -25,
  spectrum: [{ band: 'high', minShare: 0.003 }],
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalMetal, metalDeckFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalMetal, 0, 0.6376, 1, 0.93, 9600, 0, 0.001, 0.022],
      [metalDeckFootstep, 0.168, 0.27, 0.35, 0.86, 5600, 0, 0.001, 0.045],
      [naturalMetal, 0.346, 0.5491, 0.41, 1.08, 5200, 0, 0.001, 0.022],
      [naturalMetal, 1.047, 0.6177, 0.9, 0.96, 9600, 0, 0.001, 0.022],
      [metalDeckFootstep, 1.214, 0.22, 0.31, 0.9, 5800, 0, 0.001, 0.045],
      [naturalMetal, 1.385, 0.5702, 0.37, 1.04, 5100, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
