import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalMetal from './_recordings/natural-metal.ts';
import metalDeckFootstep from './_recordings/metal-deck-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'hollow-metal-running-push-off', name: "Hollow metal running push off", category: 'Footsteps & UI',
  tags: ["catwalk", "steel", "metal", "footstep", "jump", "takeoff", "toe", "burst"],
  loopable: false, durationSec: 0.438, mixRole: 'foley', targetRmsDbfs: -24,
  spectrum: [{ band: 'high', minShare: 0.003 }],
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalMetal, metalDeckFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalMetal, 0, 0.17, 0.79, 1.11, 9600, 0, 0.001, 0.022],
      [metalDeckFootstep, 0.098, 0.19, 0.31, 1.23, 8100, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.091, 0.21, 0.14, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
