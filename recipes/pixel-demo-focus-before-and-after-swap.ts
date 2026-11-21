import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "pixel-demo-focus-before-and-after-swap",
  name: "Pixel Demo Focus Before and After Swap",
  category: "Sci-Fi & UI",
  tags: ["pixel", "demo", "focus", "before", "swap"],
  loopable: false,
  durationSec: 1.03,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "rubber", 0, 0.21, 0.55, 424.97, 0.002],
      ["tone", 0.025, 0.23, 0.33, 467, 382.94, 0.013, 0.43],
      ["brush", "air", 0.096, 0.46, 0.33, 2260, 0.12],
      ["contact", "rubber", 0.4692, 0.22, 0.51, 574.41, 0.002],
      ["tone", 0.5192, 0.31, 0.43, 700.5, 737.86, 0.017, 0.3],
    ]);
  },
} satisfies SoundRecipe;
