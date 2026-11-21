import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "quick-blur-cut",
  name: "Quick Blur Cut",
  category: "Sci-Fi & UI",
  tags: ["quick", "blur", "cut"],
  loopable: false,
  durationSec: 0.62,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, .51, .82, 2190, .069],
      ["contact", "rubber", .167, .28, .56, 430, .003],
      ["grains", "paper", .26, .25, .28, 1320, 7],
    ]);
  },
} satisfies SoundRecipe;
