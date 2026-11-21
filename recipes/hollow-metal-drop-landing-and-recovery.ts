import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalMetal from './_recordings/natural-metal.ts';
import metalDeckFootstep from './_recordings/metal-deck-footstep.ts';

export default {
  id: 'hollow-metal-drop-landing-and-recovery', name: "Hollow metal drop landing and recovery", category: 'Footsteps & UI',
  tags: ["catwalk", "steel", "metal", "footstep", "drop", "heavy", "landing", "stumble"],
  loopable: false, durationSec: 1.16, mixRole: 'foley', targetRmsDbfs: -22,
  spectrum: [{ band: 'high', minShare: 0.003 }],
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, naturalMetal, metalDeckFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.2, 0.22, 1.04, 5700, 0, 0.001, 0.022],
      [naturalMetal, 0.061, 0.6895, 1, 0.86, 9600, 0, 0.001, 0.022],
      [naturalMetal, 0.109, 0.6309, 0.78, 0.94, 9600, 0, 0.001, 0.022],
      [metalDeckFootstep, 0.177, 0.29, 0.31, 0.9, 7200, 0, 0.001, 0.045],
      [naturalMetal, 0.469, 0.5542, 0.31, 1.07, 5400, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
