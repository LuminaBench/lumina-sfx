import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalMetal from './_recordings/natural-metal.ts';
import metalDeckFootstep from './_recordings/metal-deck-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'hollow-metal-braking-skid-to-a-stop', name: "Hollow metal braking skid to a stop", category: 'Footsteps & UI',
  tags: ["catwalk", "steel", "metal", "footstep", "stop", "sprint", "brake", "scuff"],
  loopable: false, durationSec: 0.971, mixRole: 'foley', targetRmsDbfs: -23,
  spectrum: [{ band: 'high', minShare: 0.003 }],
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalMetal, metalDeckFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalMetal, 0, 0.22, 0.81, 1.1, 9600, 0, 0.001, 0.022],
      [naturalMetal, 0.203, 0.6309, 0.95, 0.94, 9600, 0, 0.001, 0.022],
      [metalDeckFootstep, 0.246, 0.44, 0.64, 0.82, 8800, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.287, 0.21, 0.12, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
