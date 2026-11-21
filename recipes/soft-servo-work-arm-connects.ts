import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "soft-servo-work-arm-connects",
  name: "Soft Servo Work Arm Connects",
  category: "Sci-Fi & UI",
  tags: ["soft", "servo", "work", "arm", "connects"],
  loopable: false,
  durationSec: 0.92,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, 0.18, 0.59, 676.8, 0.002],
      ["brush", "air", 0.031, 0.42, 0.29, 1880, 0.081],
      ["motor", 0.07, 0.54, 0.33, 144.05, 219.3, 0.08, 0.63],
      ["tone", 0.272, 0.5, 0.44, 353.7, 404.79, 0.024, 0.25],
    ]);
  },
} satisfies SoundRecipe;
