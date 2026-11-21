import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "amber-guidance-console-loses-power",
  name: "Amber Guidance Console Loses Power",
  category: "Sci-Fi & UI",
  tags: ["amber", "guidance", "console", "loses", "power"],
  loopable: false,
  durationSec: 1.21,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["motor", 0, 0.78, 0.46, 316.88, 88.54, 0.035, 0.8],
      ["tone", 0.066, 0.57, 0.35, 568.11, 300.38, 0.043, 0.56],
      ["brush", "air", 0.127, 0.64, 0.26, 1029.5, 0.087],
      ["contact", "rubber", 0.66, 0.38, 0.36, 290, 0.002],
      ["grains", "rubber", 0.66, 0.37, 0.11, 1450, 7],
    ]);
  },
} satisfies SoundRecipe;
