import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldFarmMarsh from './_recordings/field-farm-marsh.ts';
import naturalDuck from './_recordings/natural-duck.ts';
import shallowWaterFootstep from './_recordings/shallow-water-footstep.ts';

export default {
  id: 'ducks-shelter-in-a-reed-channel-loop', name: "Ducks shelter in a reed channel loop", category: 'Animals',
  tags: ["duck", "pond", "marsh", "water", "loop"],
  loopable: true, durationSec: 4.5, mixRole: 'ambience', targetRmsDbfs: -29,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldFarmMarsh, naturalDuck, shallowWaterFootstep),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldFarmMarsh, 0, 5.0, 0.33, 1, 6000, 3.0, 0.001, 0.015],
      [naturalDuck, 0.57, 0.6, 0.6, 1, 10500, 0, 0.001, 0.022],
      [naturalDuck, 1.49, 0.51, 0.42, 1, 10500, 0, 0.001, 0.022],
      [shallowWaterFootstep, 2.48, 0.33, 0.23, 1, 10500, 0, 0.001, 0.022],
      [naturalDuck, 3.34, 0.52, 0.5, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
