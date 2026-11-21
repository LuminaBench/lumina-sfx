import { farmFoley } from './_shared/farm-foley.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "farm-fence-build-tap", name: "Light Fence Repair Taps", category: "Farming",
  tags: ["fence", "repair", "wood", "hammer", "building", "craft"],
  durationSec: 1.01, loopable: false, targetRmsDbfs: -23,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return farmFoley(ctx, params.force, [
      [0, 'stone', .62, 3560, .020],
      [.008, 'wood', .44, 288, .058],
      [.174, 'stone', .48, 4430, .018],
      [.181, 'wood', .37, 295, .064],
      [.407, 'stone', .76, 4920, .024],
      [.414, 'wood', .54, 232, .066],
    ]);
  },
} satisfies SoundRecipe;
