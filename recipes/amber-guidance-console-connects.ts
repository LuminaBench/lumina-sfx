import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "amber-guidance-console-connects",
  name: "Amber Guidance Console Connects",
  category: "Sci-Fi & UI",
  tags: ["amber", "guidance", "console", "connects"],
  loopable: false,
  durationSec: 0.92,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "rubber", 0, 0.18, 0.59, 522, 0.002],
      ["brush", "air", 0.031, 0.42, 0.29, 1450, 0.081],
      ["motor", 0.07, 0.54, 0.33, 156.11, 237.66, 0.08, 0.63],
      ["tone", 0.272, 0.5, 0.44, 587.7, 672.59, 0.024, 0.25],
    ]);
  },
} satisfies SoundRecipe;
