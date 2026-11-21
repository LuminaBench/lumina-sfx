import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "pixel-demo-focus-last-frame-tail",
  name: "Pixel Demo Focus Last Frame Tail",
  category: "Sci-Fi & UI",
  tags: ["pixel", "demo", "focus", "last", "frame", "tail"],
  loopable: false,
  durationSec: 1.13,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "rubber", 0, 0.22, 0.43, 467, 0.002],
      ["tone", 0.039, 0.83, 0.49, 639.79, 457.66, 0.064, 0.38],
      ["tone", 0.25, 0.66, 0.44, 452.99, 415.63, 0.044, 0.25],
      ["grains", "rubber", 0.19, 0.5, 0.19, 2260, 11],
    ]);
  },
} satisfies SoundRecipe;
