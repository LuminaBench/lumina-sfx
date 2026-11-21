import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "bold-product-card-last-frame-tail",
  name: "Bold Product Card Last Frame Tail",
  category: "Sci-Fi & UI",
  tags: ["bold", "product", "card", "last", "frame", "tail"],
  loopable: false,
  durationSec: 1.25,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "wood", 0, 0.22, 0.43, 261, 0.002],
      ["tone", 0.039, 0.83, 0.49, 357.57, 255.78, 0.064, 0.38],
      ["tone", 0.377, 0.66, 0.44, 253.17, 232.29, 0.044, 0.25],
      ["grains", "wood", 0.19, 0.5, 0.19, 2470, 11],
    ]);
  },
} satisfies SoundRecipe;
