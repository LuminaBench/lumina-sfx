import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalDuck from './_recordings/natural-duck.ts';
import shallowWaterFootstep from './_recordings/shallow-water-footstep.ts';

export default {
  id: 'mallard-slips-into-pond-water', name: "Mallard slips into pond water", category: 'Animals',
  tags: ["duck", "mallard", "splash", "quack"],
  loopable: false, durationSec: 1.622, mixRole: 'voice', targetRmsDbfs: -26,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalDuck, shallowWaterFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalDuck, 0.0, 0.66, 0.82, 1, 10500, 0, 0.001, 0.022],
      [shallowWaterFootstep, 0.51, 0.41, 0.32, 1, 10500, 0, 0.001, 0.022],
      [naturalDuck, 0.88, 0.59, 0.57, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
