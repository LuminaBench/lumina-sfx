import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "night-mode-showcase-last-frame-tail",
  name: "Night Mode Showcase Last Frame Tail",
  category: "Sci-Fi & UI",
  tags: ["night", "mode", "showcase", "last", "frame", "tail"],
  loopable: false,
  durationSec: 1.28,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "air", 0, 0.22, 0.43, 216, 0.002],
      ["tone", 0.039, 0.83, 0.49, 295.92, 211.68, 0.064, 0.38],
      ["tone", 0.406, 0.66, 0.44, 209.52, 192.24, 0.044, 0.25],
      ["grains", "air", 0.19, 0.5, 0.19, 1310, 11],
    ]);
  },
} satisfies SoundRecipe;
