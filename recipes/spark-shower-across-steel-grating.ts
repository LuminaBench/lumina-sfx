import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "spark-shower-across-steel-grating",
  name: "Spark Shower across Steel Grating",
  category: "Impacts",
  tags: ["spark", "shower", "across", "steel", "grating"],
  loopable: false,
  durationSec: 1.07,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["grains", "iron", 0, .94, .66, 2850, 40],
      ["grains", "glass", .096, .88, .42, 4850, 41],
      ["contact", "iron", .112, .43, .31, 395, .002],
    ]);
  },
} satisfies SoundRecipe;
