import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "train-platform-safety-chime",
  name: "Train Platform Safety Chime",
  category: "Vehicles & Engines",
  tags: ["train", "platform", "safety", "chime", "vehicle"],
  loopable: false,
  durationSec: 1.1,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["tone", 0, .31, .53, 497, 514, .013, .29],
      ["tone", .218, .27, .51, 614, 620, .012, .21],
      ["tone", .55, .47, .62, 757, 767, .012, .33],
    ]);
  },
} satisfies SoundRecipe;
