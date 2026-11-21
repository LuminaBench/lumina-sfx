import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "scanner-partial-detection",
  name: "Scanner Partial Detection",
  category: "Sci-Fi & UI",
  tags: ["scanner", "partial", "detection"],
  loopable: false,
  durationSec: 0.73,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["tone", 0, .25, .61, 326, 428, .008, .22],
      ["tone", .225, .34, .57, 411, 365, .017, .36],
      ["contact", "glass", .218, .19, .22, 540, .002],
    ]);
  },
} satisfies SoundRecipe;
