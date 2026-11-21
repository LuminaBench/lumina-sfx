import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "isolated-shield-projector-startup",
  name: "Isolated Shield Projector Startup",
  category: "Sci-Fi & UI",
  tags: ["isolated", "shield", "projector", "startup"],
  loopable: false,
  durationSec: 1.43,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "rubber", 0, .171, .63, 230, .001],
      ["tone", .04, .29, .54, 124, 180, .013, .42],
      ["tone", .21, .32, .51, 180, 268, .015, .55],
      ["tone", .39, .44, .54, 268, 378, .065, .55],
      ["tone", .57, .81, .42, 378, 381, .21, .73],
      ["brush", "air", .64, .71, .27, 1050, .19],
    ]);
  },
} satisfies SoundRecipe;
