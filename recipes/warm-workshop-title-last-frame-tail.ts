import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "warm-workshop-title-last-frame-tail",
  name: "Warm Workshop Title Last Frame Tail",
  category: "Sci-Fi & UI",
  tags: ["warm", "workshop", "title", "last", "frame", "tail"],
  loopable: false,
  durationSec: 1.19,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "wood", 0, 0.22, 0.43, 349, 0.002],
      ["tone", 0.039, 0.83, 0.49, 478.13, 342.02, 0.064, 0.38],
      ["tone", 0.318, 0.66, 0.44, 338.53, 310.61, 0.044, 0.25],
      ["grains", "wood", 0.19, 0.5, 0.19, 1760, 11],
    ]);
  },
} satisfies SoundRecipe;
