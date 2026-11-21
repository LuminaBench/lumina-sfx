import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "delicate-logo-close",
  name: "Delicate Logo Close",
  category: "Sci-Fi & UI",
  tags: ["delicate", "logo", "close"],
  loopable: false,
  durationSec: 1.15,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["tone", 0, .65, .56, 628, 604, .047, .20],
      ["tone", .297, .70, .46, 387, 390, .058, .42],
      ["brush", "air", .05, .84, .18, 753, .109],
    ]);
  },
} satisfies SoundRecipe;
