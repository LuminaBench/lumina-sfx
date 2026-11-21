import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "deep-space-anomaly-wake",
  name: "Deep-Space Anomaly Wake",
  category: "Sci-Fi & UI",
  tags: ["deep", "space", "anomaly", "wake"],
  loopable: false,
  durationSec: 2.12,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, 1.6, .43, 160, .084],
      ["tone", .1, 1.86, .65, 35, 85, .74, .68],
      ["tone", .43, 1.54, .45, 145, 72, .67, .84],
      ["grains", "glass", .61, 1.4, .24, 3600, 24],
    ]);
  },
} satisfies SoundRecipe;
