import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-jar-contact.ts';

export default {
  id: "warm-workshop-title-split-view-slide",
  name: "Warm Workshop Title Split View Slide",
  category: "Sci-Fi & UI",
  tags: ["warm", "workshop", "title", "split", "view", "slide"],
  loopable: false,
  durationSec: 1.0,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "wood", 0, 0.72, 0.67, 1760, 0.14],
      ['clip', source, 0.18, 0.53, 0.26, 0.065, 3344, 0.08, 0.19],
      ["tone", 0.162, 0.57, 0.33, 495.58, 289.67, 0.109, 0.46],
      ["contact", "rubber", 0.43, 0.19, 0.32, 223.36, 0.002],
    ]);
  },
} satisfies SoundRecipe;
