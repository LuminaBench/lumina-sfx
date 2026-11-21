import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/book-page-turn.ts';

export default {
  id: "paper-cutaway-short-entry",
  name: "Paper Cutaway Short Entry",
  category: "Sci-Fi & UI",
  tags: ["paper", "cutaway", "short", "entry"],
  loopable: false,
  durationSec: 0.66,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.37, 0.26, 0.028, 6930, 0.007, 0.08],
      ["brush", "paper", 0, 0.43, 0.33, 2310, 0.06],
      ["contact", "paper", 0.112, 0.2, 0.48, 530, 0.002],
      ["tone", 0.1008, 0.36, 0.5, 429.3, 630.7, 0.021, 0.28],
    ]);
  },
} satisfies SoundRecipe;
