import { farmFoley } from './_shared/farm-foley.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "sharpen-garden-blade", name: "Honing a Garden Blade", category: "Farming",
  tags: ["whetstone", "sharpen", "blade", "tool", "stone"],
  durationSec: 1.12, loopable: false, targetRmsDbfs: -24,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return farmFoley(ctx, params.force, [
      [0, 'stone', .49, 4790, .072],
      [.064, 'leaf', .52, 4460, .077],
      [.149, 'metal', .15, 991, .05],
      [.438, 'stone', .65, 3730, .061],
      [.513, 'leaf', .44, 5230, .081],
      [.591, 'metal', .10, 1156, .049],
    ]);
  },
} satisfies SoundRecipe;
