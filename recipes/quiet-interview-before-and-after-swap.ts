import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "quiet-interview-before-and-after-swap",
  name: "Quiet Interview Before and After Swap",
  category: "Sci-Fi & UI",
  tags: ["quiet", "interview", "before", "swap"],
  loopable: false,
  durationSec: 1.11,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "cloth", 0, 0.21, 0.55, 301.21, 0.002],
      ["tone", 0.025, 0.23, 0.33, 331, 271.42, 0.013, 0.43],
      ["brush", "air", 0.185, 0.46, 0.33, 1560, 0.12],
      ["contact", "cloth", 0.487, 0.22, 0.51, 407.13, 0.002],
      ["tone", 0.537, 0.31, 0.43, 496.5, 522.98, 0.017, 0.3],
    ]);
  },
} satisfies SoundRecipe;
