import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalDuck from './_recordings/natural-duck.ts';
import fieldBirdFlutter from './_recordings/field-bird-flutter.ts';
import shallowWaterFootstep from './_recordings/shallow-water-footstep.ts';

export default {
  id: 'ducks-scatter-from-a-reed-bed', name: "Ducks scatter from a reed bed", category: 'Animals',
  tags: ["duck", "mallard", "flock", "startled", "wings"],
  loopable: false, durationSec: 1.592, mixRole: 'voice', targetRmsDbfs: -23,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalDuck, fieldBirdFlutter, shallowWaterFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalDuck, 0.0, 0.61, 0.82, 1, 10500, 0, 0.001, 0.022],
      [fieldBirdFlutter, 0.09, 0.83, 0.78, 1, 10500, 0, 0.001, 0.022],
      [shallowWaterFootstep, 0.26, 0.39, 0.44, 1, 10500, 0, 0.001, 0.022],
      [naturalDuck, 0.83, 0.61, 0.58, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
