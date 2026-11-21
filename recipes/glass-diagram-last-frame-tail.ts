import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "glass-diagram-last-frame-tail",
  name: "Glass Diagram Last Frame Tail",
  category: "Sci-Fi & UI",
  tags: ["glass", "diagram", "last", "frame", "tail"],
  loopable: false,
  durationSec: 1.17,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "glass", 0, 0.22, 0.43, 762, 0.002],
      ["tone", 0.039, 0.83, 0.49, 1043.94, 746.76, 0.064, 0.38],
      ["tone", 0.291, 0.66, 0.44, 739.14, 678.18, 0.044, 0.25],
      ["grains", "glass", 0.19, 0.5, 0.19, 3160, 11],
    ]);
  },
} satisfies SoundRecipe;
