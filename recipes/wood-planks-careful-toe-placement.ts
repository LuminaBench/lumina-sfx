import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalPlanks from './_recordings/natural-planks.ts';
import barnTimberCreak from './_recordings/barn-timber-creak.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'wood-planks-careful-toe-placement', name: "Wood planks careful toe placement", category: 'Footsteps & UI',
  tags: ["boardwalk", "plank", "deck", "wooden", "footstep", "sneak", "tiptoe", "quiet", "stealth"],
  loopable: false, durationSec: 0.378, mixRole: 'foley', targetRmsDbfs: -28,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalPlanks, barnTimberCreak, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalPlanks, 0, 0.2, 0.7, 1.08, 5400, 0, 0.001, 0.022],
      [barnTimberCreak, 0.104, 0.16, 0.1, 1.05, 3600, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.025, 0.21, 0.055, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.024, 0.064], send: 0.125, dampingHz: 3300 });
  },
} satisfies SoundRecipe;
