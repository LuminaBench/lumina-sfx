import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "paper-cutaway-before-and-after-swap",
  name: "Paper Cutaway Before and After Swap",
  category: "Sci-Fi & UI",
  tags: ["paper", "cutaway", "before", "swap"],
  loopable: false,
  durationSec: 1.04,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "paper", 0, 0.21, 0.55, 482.3, 0.002],
      ["tone", 0.025, 0.23, 0.33, 530, 434.6, 0.013, 0.43],
      ["brush", "air", 0.112, 0.46, 0.33, 2310, 0.12],
      ["contact", "paper", 0.4724, 0.22, 0.51, 651.9, 0.002],
      ["tone", 0.5224, 0.31, 0.43, 795, 837.4, 0.017, 0.3],
    ]);
  },
} satisfies SoundRecipe;
