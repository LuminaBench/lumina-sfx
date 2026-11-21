import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "ceramic-shield-frame-loses-power",
  name: "Ceramic Shield Frame Loses Power",
  category: "Sci-Fi & UI",
  tags: ["ceramic", "shield", "frame", "loses", "power"],
  loopable: false,
  durationSec: 1.21,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["motor", 0, 0.78, 0.46, 327.76, 91.58, 0.035, 0.8],
      ["tone", 0.066, 0.57, 0.35, 677.73, 358.34, 0.043, 0.56],
      ["brush", "air", 0.127, 0.64, 0.26, 2364.3, 0.087],
      ["contact", "glass", 0.66, 0.38, 0.36, 666, 0.002],
      ["grains", "glass", 0.66, 0.37, 0.11, 3330, 7],
    ]);
  },
} satisfies SoundRecipe;
