import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalPuddles from './_recordings/natural-puddles.ts';
import shallowWaterFootstep from './_recordings/shallow-water-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'shallow-puddles-careful-toe-placement', name: "Shallow puddles careful toe placement", category: 'Footsteps & UI',
  tags: ["water", "wet", "splash", "puddle", "footstep", "sneak", "tiptoe", "quiet", "stealth"],
  loopable: false, durationSec: 0.416, mixRole: 'foley', targetRmsDbfs: -30,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalPuddles, shallowWaterFootstep, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalPuddles, 0, 0.2, 0.7, 1.08, 5400, 0, 0.001, 0.022],
      [shallowWaterFootstep, 0.104, 0.16, 0.1, 1.05, 3600, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.025, 0.21, 0.055, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
