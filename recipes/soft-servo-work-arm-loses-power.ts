import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "soft-servo-work-arm-loses-power",
  name: "Soft Servo Work Arm Loses Power",
  category: "Sci-Fi & UI",
  tags: ["soft", "servo", "work", "arm", "loses", "power"],
  loopable: false,
  durationSec: 1.21,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["motor", 0, 0.78, 0.46, 292.4, 81.7, 0.035, 0.8],
      ["tone", 0.066, 0.57, 0.35, 341.91, 180.78, 0.043, 0.56],
      ["brush", "air", 0.127, 0.64, 0.26, 1334.8, 0.087],
      ["contact", "iron", 0.66, 0.38, 0.36, 376, 0.002],
      ["grains", "iron", 0.66, 0.37, 0.11, 1880, 7],
    ]);
  },
} satisfies SoundRecipe;
