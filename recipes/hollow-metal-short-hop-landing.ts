import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalMetal from './_recordings/natural-metal.ts';
import metalDeckFootstep from './_recordings/metal-deck-footstep.ts';

export default {
  id: 'hollow-metal-short-hop-landing', name: "Hollow metal short hop landing", category: 'Footsteps & UI',
  tags: ["catwalk", "steel", "metal", "footstep", "jump", "landing", "hop"],
  loopable: false, durationSec: 0.826, mixRole: 'foley', targetRmsDbfs: -23,
  spectrum: [{ band: 'high', minShare: 0.003 }],
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, naturalMetal, metalDeckFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.14, 0.16, 1.04, 5700, 0, 0.001, 0.022],
      [naturalMetal, 0.084, 0.6051, 1, 0.98, 9600, 0, 0.001, 0.022],
      [naturalMetal, 0.118, 0.5491, 0.54, 1.08, 6200, 0, 0.001, 0.022],
      [metalDeckFootstep, 0.177, 0.18, 0.14, 1.1, 7500, 0, 0.001, 0.045],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
