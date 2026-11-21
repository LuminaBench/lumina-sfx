import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "night-mode-showcase-before-and-after-swap",
  name: "Night Mode Showcase Before and After Swap",
  category: "Sci-Fi & UI",
  tags: ["night", "mode", "showcase", "before", "swap"],
  loopable: false,
  durationSec: 1.18,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "air", 0, 0.21, 0.55, 196.56, 0.002],
      ["tone", 0.025, 0.23, 0.33, 216, 177.12, 0.013, 0.43],
      ["brush", "air", 0.252, 0.46, 0.33, 1310, 0.12],
      ["contact", "air", 0.5004, 0.22, 0.51, 265.68, 0.002],
      ["tone", 0.5504, 0.31, 0.43, 324, 341.28, 0.017, 0.3],
    ]);
  },
} satisfies SoundRecipe;
