import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "remote-greenhouse-regulator-loses-power",
  name: "Remote Greenhouse Regulator Loses Power",
  category: "Sci-Fi & UI",
  tags: ["remote", "greenhouse", "regulator", "loses", "power"],
  loopable: false,
  durationSec: 1.21,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["motor", 0, 0.78, 0.46, 224.4, 62.7, 0.035, 0.8],
      ["tone", 0.066, 0.57, 0.35, 421.08, 222.64, 0.043, 0.56],
      ["brush", "air", 0.127, 0.64, 0.26, 1434.2, 0.087],
      ["contact", "wood", 0.66, 0.38, 0.36, 404, 0.002],
      ["grains", "wood", 0.66, 0.37, 0.11, 2020, 7],
    ]);
  },
} satisfies SoundRecipe;
