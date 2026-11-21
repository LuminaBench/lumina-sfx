import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "thin-shield-dissolve",
  name: "Thin Shield Dissolve",
  category: "Sci-Fi & UI",
  tags: ["thin", "shield", "dissolve"],
  loopable: false,
  durationSec: 1.16,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "glass", 0, .25, .49, 822, .001],
      ["tone", .012, .52, .51, 1215, 483, .013, .70],
      ["grains", "glass", .071, .90, .67, 2660, 36],
      ["brush", "air", .39, .69, .22, 566, .07],
    ]);
  },
} satisfies SoundRecipe;
