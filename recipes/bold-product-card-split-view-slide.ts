import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/slatted-crate-settle.ts';

export default {
  id: "bold-product-card-split-view-slide",
  name: "Bold Product Card Split View Slide",
  category: "Sci-Fi & UI",
  tags: ["bold", "product", "card", "split", "view", "slide"],
  loopable: false,
  durationSec: 1.04,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "wood", 0, 0.72, 0.67, 2470, 0.14],
      ['clip', source, 0.18, 0.53, 0.26, 0.065, 4693, 0.08, 0.19],
      ["tone", 0.162, 0.57, 0.33, 370.62, 216.63, 0.109, 0.46],
      ["contact", "rubber", 0.43, 0.19, 0.32, 167.04, 0.002],
    ]);
  },
} satisfies SoundRecipe;
