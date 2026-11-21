import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalMetal from './_recordings/natural-metal.ts';
import metalDeckFootstep from './_recordings/metal-deck-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'hollow-metal-careful-toe-placement', name: "Hollow metal careful toe placement", category: 'Footsteps & UI',
  tags: ["catwalk", "steel", "metal", "footstep", "sneak", "tiptoe", "quiet", "stealth"],
  loopable: false, durationSec: 0.401, mixRole: 'foley', targetRmsDbfs: -27,
  spectrum: [{ band: 'high', minShare: 0.003 }],
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalMetal, metalDeckFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalMetal, 0, 0.2, 0.7, 1.08, 5400, 0, 0.001, 0.022],
      [metalDeckFootstep, 0.104, 0.16, 0.1, 1.05, 3600, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.025, 0.21, 0.055, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
