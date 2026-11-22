import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/bundle-dry-stalks.ts';
import source2 from './_recordings/dry-vine-brush.ts';

export default {
  id: "hand-mulching-a-row",
  name: "Hand-Mulching a Row",
  category: "Farming",
  tags: ["hand", "mulching", "row", "farm"],
  loopable: false,
  durationSec: 0.79,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .62, .87, 0, 10200],
      ['clip', source2, .11, .55, .46, .07, 8700],
      ["grains", "plant", .13, .33, .15, 1450, 9],
    ]);
  },
} satisfies SoundRecipe;
