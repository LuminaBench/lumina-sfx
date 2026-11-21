import { farmFoley } from './_shared/farm-foley.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "dibber-hole", name: "Wooden Dibber Making a Hole", category: "Farming",
  tags: ["dibber", "soil", "planting", "tool", "make-hole"],
  durationSec: .38, loopable: false, targetRmsDbfs: -26,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return farmFoley(ctx, params.force, [
      [0, 'earth', .4, 590, .042],
      [.02, 'wood', .52, 288, .046],
      [.116, 'grain', .58, 1920, .042],
    ]);
  },
} satisfies SoundRecipe;
