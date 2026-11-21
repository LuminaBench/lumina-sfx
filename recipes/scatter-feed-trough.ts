import { farmFoley } from './_shared/farm-foley.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "scatter-feed-trough", name: "Grain Scatter into a Feed Trough", category: "Farming",
  tags: ["grain", "feed", "trough", "scatter", "animal", "feeding"],
  durationSec: .69, loopable: false, targetRmsDbfs: -25,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return farmFoley(ctx, params.force, [
      [0, 'grain', .72, 3900, .066],
      [.024, 'wood', .32, 349, .056],
      [.117, 'grain', .55, 3380, .086],
      [.144, 'metal', .11, 625, .053],
    ]);
  },
} satisfies SoundRecipe;
