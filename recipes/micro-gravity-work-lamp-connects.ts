import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "micro-gravity-work-lamp-connects",
  name: "Micro Gravity Work Lamp Connects",
  category: "Sci-Fi & UI",
  tags: ["micro", "gravity", "work", "lamp", "connects"],
  loopable: false,
  durationSec: 0.92,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "glass", 0, 0.18, 0.59, 651.6, 0.002],
      ["brush", "air", 0.031, 0.42, 0.29, 1810, 0.081],
      ["motor", 0.07, 0.54, 0.33, 123.28, 187.68, 0.08, 0.63],
      ["tone", 0.272, 0.5, 0.44, 411.3, 470.71, 0.024, 0.25],
    ]);
  },
} satisfies SoundRecipe;
