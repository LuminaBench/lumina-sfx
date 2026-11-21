import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/physical-light-switch.ts';

export default {
  id: "pixel-demo-focus-split-view-slide",
  name: "Pixel Demo Focus Split View Slide",
  category: "Sci-Fi & UI",
  tags: ["pixel", "demo", "focus", "split", "view", "slide"],
  loopable: false,
  durationSec: 0.94,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "rubber", 0, 0.72, 0.67, 2260, 0.14],
      ['clip', source, 0.18, 0.53, 0.26, 0.065, 4294, 0.08, 0.19],
      ["tone", 0.162, 0.57, 0.33, 663.14, 387.61, 0.109, 0.46],
      ["contact", "rubber", 0.43, 0.19, 0.32, 298.88, 0.002],
    ]);
  },
} satisfies SoundRecipe;
