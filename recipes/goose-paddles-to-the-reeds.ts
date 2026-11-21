import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import shallowWaterFootstep from './_recordings/shallow-water-footstep.ts';
import gooseSingleHonk from './_recordings/goose-single-honk.ts';
import dryVineBrush from './_recordings/dry-vine-brush.ts';

export default {
  id: 'goose-paddles-to-the-reeds', name: "Goose paddles to the reeds", category: 'Animals',
  tags: ["goose", "water", "honk", "reed"],
  loopable: false, durationSec: 1.582, mixRole: 'voice', targetRmsDbfs: -26,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(shallowWaterFootstep, gooseSingleHonk, dryVineBrush),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [shallowWaterFootstep, 0.0, 0.37, 0.26, 1, 10500, 0, 0.001, 0.022],
      [gooseSingleHonk, 0.31, 0.41, 0.79, 1, 10500, 0, 0.001, 0.022],
      [shallowWaterFootstep, 0.76, 0.29, 0.22, 1, 10500, 0, 0.001, 0.022],
      [dryVineBrush, 1.03, 0.4, 0.14, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
