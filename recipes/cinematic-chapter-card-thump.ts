import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "cinematic-chapter-card-thump",
  name: "Cinematic Chapter Card Thump",
  category: "Sci-Fi & UI",
  tags: ["cinematic", "chapter", "card", "thump"],
  loopable: false,
  durationSec: 1.55,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "wood", 0, .68, .64, 137, .005],
      ["tone", .006, 1.26, .57, 104, 48, .021, .48],
      ["brush", "air", .17, 1.17, .52, 669, .216],
    ]);
  },
} satisfies SoundRecipe;
