import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "bright-feature-highlight",
  name: "Bright Feature Highlight",
  category: "Sci-Fi & UI",
  tags: ["bright", "feature", "highlight"],
  loopable: false,
  durationSec: 0.8,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "glass", 0, .124, .66, 1070, .001],
      ["tone", .03, .26, .51, 913, 881, .013, .21],
      ["tone", .237, .42, .49, 1364, 1388, .027, .18],
    ]);
  },
} satisfies SoundRecipe;
