import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "glass-diagram-before-and-after-swap",
  name: "Glass Diagram Before and After Swap",
  category: "Sci-Fi & UI",
  tags: ["glass", "diagram", "before", "swap"],
  loopable: false,
  durationSec: 1.07,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "glass", 0, 0.21, 0.55, 693.42, 0.002],
      ["tone", 0.025, 0.23, 0.33, 762, 624.84, 0.013, 0.43],
      ["brush", "air", 0.137, 0.46, 0.33, 3160, 0.12],
      ["contact", "glass", 0.4774, 0.22, 0.51, 937.26, 0.002],
      ["tone", 0.5274, 0.31, 0.43, 1143, 1203.96, 0.017, 0.3],
    ]);
  },
} satisfies SoundRecipe;
