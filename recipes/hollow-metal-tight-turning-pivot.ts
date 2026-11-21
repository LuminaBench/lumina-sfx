import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalMetal from './_recordings/natural-metal.ts';
import metalDeckFootstep from './_recordings/metal-deck-footstep.ts';

export default {
  id: 'hollow-metal-tight-turning-pivot', name: "Hollow metal tight turning pivot", category: 'Footsteps & UI',
  tags: ["catwalk", "steel", "metal", "footstep", "pivot", "turn", "scrape"],
  loopable: false, durationSec: 1.012, mixRole: 'foley', targetRmsDbfs: -25,
  spectrum: [{ band: 'high', minShare: 0.003 }],
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalMetal, metalDeckFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalMetal, 0, 0.22, 0.72, 1, 9600, 0, 0.001, 0.022],
      [metalDeckFootstep, 0.069, 0.35, 0.59, 1.07, 7800, 0, 0.001, 0.045],
      [naturalMetal, 0.331, 0.544, 0.37, 1.09, 6100, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
