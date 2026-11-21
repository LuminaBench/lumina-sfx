import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "paper-cutaway-last-frame-tail",
  name: "Paper Cutaway Last Frame Tail",
  category: "Sci-Fi & UI",
  tags: ["paper", "cutaway", "last", "frame", "tail"],
  loopable: false,
  durationSec: 1.14,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "paper", 0, 0.22, 0.43, 530, 0.002],
      ["tone", 0.039, 0.83, 0.49, 726.1, 519.4, 0.064, 0.38],
      ["tone", 0.266, 0.66, 0.44, 514.1, 471.7, 0.044, 0.25],
      ["grains", "paper", 0.19, 0.5, 0.19, 2310, 11],
    ]);
  },
} satisfies SoundRecipe;
