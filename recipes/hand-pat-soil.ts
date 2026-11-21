import { farmFoley } from './_shared/farm-foley.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "hand-pat-soil", name: "Firming Soil by Hand", category: "Farming",
  tags: ["soil", "pat", "hand", "planting", "quiet"],
  durationSec: .49, loopable: false, targetRmsDbfs: -27,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return farmFoley(ctx, params.force, [
      [0, 'earth', .88, 470, .043],
      [.153, 'earth', .64, 320, .041],
      [.183, 'grain', .29, 2100, .029],
    ]);
  },
} satisfies SoundRecipe;
