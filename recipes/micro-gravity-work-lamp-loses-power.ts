import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "micro-gravity-work-lamp-loses-power",
  name: "Micro Gravity Work Lamp Loses Power",
  category: "Sci-Fi & UI",
  tags: ["micro", "gravity", "work", "lamp", "loses", "power"],
  loopable: false,
  durationSec: 1.21,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["motor", 0, 0.78, 0.46, 250.24, 69.92, 0.035, 0.8],
      ["tone", 0.066, 0.57, 0.35, 397.59, 210.22, 0.043, 0.56],
      ["brush", "air", 0.127, 0.64, 0.26, 1285.1, 0.087],
      ["contact", "glass", 0.66, 0.38, 0.36, 362, 0.002],
      ["grains", "glass", 0.66, 0.37, 0.11, 1810, 7],
    ]);
  },
} satisfies SoundRecipe;
