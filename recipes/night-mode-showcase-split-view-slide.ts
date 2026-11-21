import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sheltered-wind.ts';

export default {
  id: "night-mode-showcase-split-view-slide",
  name: "Night Mode Showcase Split View Slide",
  category: "Sci-Fi & UI",
  tags: ["night", "mode", "showcase", "split", "view", "slide"],
  loopable: false,
  durationSec: 1.07,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, 0.72, 0.67, 1310, 0.14],
      ['clip', source, 0.18, 0.53, 0.26, 0.065, 2489, 0.08, 0.19],
      ["tone", 0.162, 0.57, 0.33, 306.72, 179.28, 0.109, 0.46],
      ["contact", "rubber", 0.43, 0.19, 0.32, 138.24, 0.002],
    ]);
  },
} satisfies SoundRecipe;
