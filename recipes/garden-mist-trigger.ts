import { farmFoley } from './_shared/farm-foley.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "garden-mist-trigger", name: "Garden Mister Trigger", category: "Farming",
  tags: ["mister", "spray", "water", "plant", "hand-tool"],
  durationSec: .42, loopable: false, targetRmsDbfs: -26,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return farmFoley(ctx, params.force, [
      [0, 'snap', .35, 3200, .018],
      [.038, 'leaf', .76, 6300, .062],
      [.108, 'water', .14, 1450, .041],
      [.19, 'snap', .33, 2900, .027],
    ]);
  },
} satisfies SoundRecipe;
