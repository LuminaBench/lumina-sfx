import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "warm-workshop-title-before-and-after-swap",
  name: "Warm Workshop Title Before and After Swap",
  category: "Sci-Fi & UI",
  tags: ["warm", "workshop", "title", "before", "swap"],
  loopable: false,
  durationSec: 1.09,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "wood", 0, 0.21, 0.55, 317.59, 0.002],
      ["tone", 0.025, 0.23, 0.33, 349, 286.18, 0.013, 0.43],
      ["brush", "air", 0.164, 0.46, 0.33, 1760, 0.12],
      ["contact", "wood", 0.4828, 0.22, 0.51, 429.27, 0.002],
      ["tone", 0.5328, 0.31, 0.43, 523.5, 551.42, 0.017, 0.3],
    ]);
  },
} satisfies SoundRecipe;
