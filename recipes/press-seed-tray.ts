import { farmFoley } from './_shared/farm-foley.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "press-seed-tray", name: "Pressing a Seedling Tray", category: "Farming",
  tags: ["seed", "seedling", "tray", "plastic", "press"],
  durationSec: .45, loopable: false, targetRmsDbfs: -27,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return farmFoley(ctx, params.force, [
      [0, 'cloth', .44, 1800, .031],
      [.01, 'wood', .31, 355, .024],
      [.068, 'earth', .43, 650, .022],
      [.136, 'snap', .29, 2950, .024],
      [.162, 'cloth', .21, 2000, .024],
    ]);
  },
} satisfies SoundRecipe;
