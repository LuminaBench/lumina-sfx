import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/book-page-turn.ts';

export default {
  id: "paper-cutaway-split-view-slide",
  name: "Paper Cutaway Split View Slide",
  category: "Sci-Fi & UI",
  tags: ["paper", "cutaway", "split", "view", "slide"],
  loopable: false,
  durationSec: 0.96,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "paper", 0, 0.72, 0.67, 2310, 0.14],
      ['clip', source, 0.18, 0.53, 0.26, 0.065, 4389, 0.08, 0.19],
      ["tone", 0.162, 0.57, 0.33, 752.6, 439.9, 0.109, 0.46],
      ["contact", "rubber", 0.43, 0.19, 0.32, 339.2, 0.002],
    ]);
  },
} satisfies SoundRecipe;
