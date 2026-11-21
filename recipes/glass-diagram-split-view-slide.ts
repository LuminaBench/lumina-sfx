import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-glass-lid.ts';

export default {
  id: "glass-diagram-split-view-slide",
  name: "Glass Diagram Split View Slide",
  category: "Sci-Fi & UI",
  tags: ["glass", "diagram", "split", "view", "slide"],
  loopable: false,
  durationSec: 0.98,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "glass", 0, 0.72, 0.67, 3160, 0.14],
      ['clip', source, 0.18, 0.53, 0.26, 0.065, 6004, 0.08, 0.19],
      ["tone", 0.162, 0.57, 0.33, 1082.04, 632.46, 0.109, 0.46],
      ["contact", "rubber", 0.43, 0.19, 0.32, 487.68, 0.002],
    ]);
  },
} satisfies SoundRecipe;
