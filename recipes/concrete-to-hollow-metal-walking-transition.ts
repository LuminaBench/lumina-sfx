import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalConcrete from './_recordings/natural-concrete.ts';
import naturalMetal from './_recordings/natural-metal.ts';
import metalDeckFootstep from './_recordings/metal-deck-footstep.ts';

export default {
  id: 'concrete-to-hollow-metal-walking-transition', name: "Concrete to hollow metal walking transition", category: 'Footsteps & UI',
  tags: ["pavement", "cement", "hard", "catwalk", "steel", "metal", "footstep", "crossing", "threshold", "transition", "walk"],
  loopable: false, durationSec: 2.126, mixRole: 'foley', targetRmsDbfs: -24,
  spectrum: [{ band: 'high', minShare: 0.003 }],
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalConcrete, naturalMetal, metalDeckFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalConcrete, 0, 0.3778, 0.66, 0.99, 7200, 0, 0.001, 0.022],
      [naturalConcrete, 0.465, 0.374, 0.78, 1, 10500, 0, 0.001, 0.022],
      [naturalMetal, 0.94, 0.593, 1, 1, 10500, 0, 0.001, 0.022],
      [metalDeckFootstep, 1.04, 0.16, 0.1, 1.07, 5900, 0, 0.001, 0.022],
      [naturalMetal, 1.424, 0.5648, 0.82, 1.05, 10500, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
