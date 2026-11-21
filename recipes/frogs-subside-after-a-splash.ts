import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import marshFrogsNightLoop from './_recordings/marsh-frogs-night-loop.ts';
import shallowWaterFootstep from './_recordings/shallow-water-footstep.ts';
import fieldFarmMarsh from './_recordings/field-farm-marsh.ts';

export default {
  id: 'frogs-subside-after-a-splash', name: "Frogs subside after a splash", category: 'Animals',
  tags: ["frog", "frogs", "pond", "scatter"],
  loopable: false, durationSec: 2.842, mixRole: 'voice', targetRmsDbfs: -28,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(marshFrogsNightLoop, shallowWaterFootstep, fieldFarmMarsh),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [marshFrogsNightLoop, 0.0, 1.46, 0.89, 1.0, 9400.0, 1.0, 0.001, 0.022],
      [shallowWaterFootstep, 1.32, 0.41, 0.64, 1, 10500, 0, 0.001, 0.022],
      [fieldFarmMarsh, 1.43, 1.26, 0.12, 1.0, 4200.0, 2.0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
