import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalMetal from './_recordings/natural-metal.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import metalDeckFootstep from './_recordings/metal-deck-footstep.ts';

export default {
  id: 'hollow-metal-slow-stalking-approach', name: "Hollow metal slow stalking approach", category: 'Footsteps & UI',
  tags: ["catwalk", "steel", "metal", "footstep", "stealth", "approach", "sneak", "sequence"],
  loopable: false, durationSec: 2.337, mixRole: 'foley', targetRmsDbfs: -26,
  spectrum: [{ band: 'high', minShare: 0.003 }],
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalMetal, jacketMovementRustle, metalDeckFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalMetal, 0, 0.593, 0.44, 1, 3600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.49, 0.21, 0.065, 1.04, 5700, 0, 0.001, 0.022],
      [naturalMetal, 0.744, 0.5702, 0.64, 1.04, 4600, 0, 0.001, 0.022],
      [naturalMetal, 1.601, 0.599, 0.86, 0.99, 6100, 0, 0.001, 0.022],
      [metalDeckFootstep, 1.746, 0.17, 0.11, 1.1, 4500, 0, 0.001, 0.045],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
