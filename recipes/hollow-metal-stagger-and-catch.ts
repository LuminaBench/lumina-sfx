import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalMetal from './_recordings/natural-metal.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import metalDeckFootstep from './_recordings/metal-deck-footstep.ts';

export default {
  id: 'hollow-metal-stagger-and-catch', name: "Hollow metal stagger and catch", category: 'Footsteps & UI',
  tags: ["catwalk", "steel", "metal", "footstep", "stumble", "recovery", "trip"],
  loopable: false, durationSec: 1.195, mixRole: 'foley', targetRmsDbfs: -23,
  spectrum: [{ band: 'high', minShare: 0.003 }],
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalMetal, jacketMovementRustle, metalDeckFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalMetal, 0, 0.5491, 0.67, 1.08, 9600, 0, 0.001, 0.022],
      [naturalMetal, 0.146, 0.6242, 0.84, 0.95, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.229, 0.21, 0.19, 1.04, 5700, 0, 0.001, 0.022],
      [naturalMetal, 0.406, 0.6516, 1, 0.91, 9600, 0, 0.001, 0.022],
      [metalDeckFootstep, 0.536, 0.23, 0.18, 1.02, 5400, 0, 0.001, 0.045],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
