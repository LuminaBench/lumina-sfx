import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "single-hailstone-on-wood",
  name: "Single Hailstone on Wood",
  category: "Weather & Ambience",
  tags: ["single", "hailstone", "wood", "ambience"],
  loopable: false,
  durationSec: 0.34,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "wood", 0, .15, .70, 535, .0004],
      ["contact", "stone", .004, .044, .80, 2340, .0003],
      ["contact", "wood", .071, .13, .31, 390, .0014],
    ]);
  },
} satisfies SoundRecipe;
