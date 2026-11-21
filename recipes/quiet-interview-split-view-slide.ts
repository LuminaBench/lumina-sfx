import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "quiet-interview-split-view-slide",
  name: "Quiet Interview Split View Slide",
  category: "Sci-Fi & UI",
  tags: ["quiet", "interview", "split", "view", "slide"],
  loopable: false,
  durationSec: 1.01,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "cloth", 0, 0.72, 0.67, 1560, 0.14],
      ['clip', source, 0.18, 0.53, 0.26, 0.065, 2964, 0.08, 0.19],
      ["tone", 0.162, 0.57, 0.33, 470.02, 274.73, 0.109, 0.46],
      ["contact", "rubber", 0.43, 0.19, 0.32, 211.84, 0.002],
    ]);
  },
} satisfies SoundRecipe;
