import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "prototype-warning-throb",
  name: "Prototype Warning Throb",
  category: "Sci-Fi & UI",
  tags: ["prototype", "warning", "throb"],
  loopable: false,
  durationSec: 1.32,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["tone", 0, .48, .62, 292, 268, .018, .92],
      ["tone", .71, .55, .54, 234, 214, .035, .79],
      ["brush", "air", .145, .43, .23, 1340, .07],
    ]);
  },
} satisfies SoundRecipe;
