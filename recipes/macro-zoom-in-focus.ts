import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "macro-zoom-in-focus",
  name: "Macro Zoom-in Focus",
  category: "Sci-Fi & UI",
  tags: ["macro", "zoom", "focus"],
  loopable: false,
  durationSec: 0.78,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, .58, .54, 2140, .082],
      ["tone", .016, .58, .56, 155, 740, .10, .62],
      ["contact", "glass", .362, .21, .46, 842, .004],
    ]);
  },
} satisfies SoundRecipe;
