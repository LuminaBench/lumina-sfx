import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "bold-product-card-before-and-after-swap",
  name: "Bold Product Card Before and After Swap",
  category: "Sci-Fi & UI",
  tags: ["bold", "product", "card", "before", "swap"],
  loopable: false,
  durationSec: 1.15,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "wood", 0, 0.21, 0.55, 237.51, 0.002],
      ["tone", 0.025, 0.23, 0.33, 261, 214.02, 0.013, 0.43],
      ["brush", "air", 0.223, 0.46, 0.33, 2470, 0.12],
      ["contact", "wood", 0.4946, 0.22, 0.51, 321.03, 0.002],
      ["tone", 0.5446, 0.31, 0.43, 391.5, 412.38, 0.017, 0.3],
    ]);
  },
} satisfies SoundRecipe;
