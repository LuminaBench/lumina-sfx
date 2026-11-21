import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "quiet-interview-last-frame-tail",
  name: "Quiet Interview Last Frame Tail",
  category: "Sci-Fi & UI",
  tags: ["quiet", "interview", "last", "frame", "tail"],
  loopable: false,
  durationSec: 1.22,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "cloth", 0, 0.22, 0.43, 331, 0.002],
      ["tone", 0.039, 0.83, 0.49, 453.47, 324.38, 0.064, 0.38],
      ["tone", 0.339, 0.66, 0.44, 321.07, 294.59, 0.044, 0.25],
      ["grains", "cloth", 0.19, 0.5, 0.19, 1560, 11],
    ]);
  },
} satisfies SoundRecipe;
