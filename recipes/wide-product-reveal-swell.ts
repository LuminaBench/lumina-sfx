import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "wide-product-reveal-swell",
  name: "Wide Product Reveal Swell",
  category: "Sci-Fi & UI",
  tags: ["wide", "product", "reveal", "swell"],
  loopable: false,
  durationSec: 2.32,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, 1.67, .65, 825, .44],
      ["tone", .43, 1.64, .43, 174, 259, .46, .65],
      ["tone", .79, 1.43, .39, 311, 391, .46, .59],
      ["tone", 1.21, .91, .36, 521, 523, .063, .18],
    ]);
  },
} satisfies SoundRecipe;
