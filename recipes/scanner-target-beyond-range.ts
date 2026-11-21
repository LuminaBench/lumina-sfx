import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "scanner-target-beyond-range",
  name: "Scanner Target Beyond Range",
  category: "Sci-Fi & UI",
  tags: ["scanner", "target", "beyond", "range"],
  loopable: false,
  durationSec: 0.77,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, .54, .31, 2008, .02],
      ["tone", .019, .43, .32, 621, 512, .023, .21],
      ["tone", .17, .42, .48, 508, 435, .019, .19],
      ["contact", "rubber", .30, .12, .13, 520, .008],
    ]);
  },
} satisfies SoundRecipe;
