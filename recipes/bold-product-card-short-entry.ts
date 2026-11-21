import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/slatted-crate-settle.ts';

export default {
  id: "bold-product-card-short-entry",
  name: "Bold Product Card Short Entry",
  category: "Sci-Fi & UI",
  tags: ["bold", "product", "card", "short", "entry"],
  loopable: false,
  durationSec: 0.8,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.37, 0.26, 0.028, 7410, 0.007, 0.08],
      ["brush", "wood", 0, 0.43, 0.33, 2470, 0.06],
      ["contact", "wood", 0.223, 0.2, 0.48, 261, 0.002],
      ["tone", 0.2007, 0.36, 0.5, 211.41, 310.59, 0.021, 0.28],
    ]);
  },
} satisfies SoundRecipe;
