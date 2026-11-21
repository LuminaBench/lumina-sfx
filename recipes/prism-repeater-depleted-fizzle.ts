import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "prism-repeater-depleted-fizzle",
  name: "Prism repeater depleted fizzle",
  category: "Weapons",
  tags: ["prism", "repeater", "depleted", "fizzle"],
  loopable: false,
  durationSec: 0.72,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, .055, .64, 966, .00063],
      ["tone", 0, .25, .45, 611, 117, .0016, .72],
      ["grains", "glass", .012, .57, .33, 1095, 8],
      ["contact", "air", .096, .11, .34, 1280, .004],
      ["brush", "air", .22, .36, .32, 1790, .009],
    ]);
  },
} satisfies SoundRecipe;
