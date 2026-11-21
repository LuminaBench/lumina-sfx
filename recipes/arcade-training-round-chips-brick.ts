import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "arcade-training-round-chips-brick",
  name: "Arcade training round chips brick",
  category: "Weapons",
  tags: ["arcade", "training", "round", "chips", "brick"],
  loopable: false,
  durationSec: 0.77,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "stone", 0, .101, .83, 644, .0005],
      ["contact", "iron", 0, .046, .35, 1440, .0006],
      ["grains", "stone", .029, .62, .61, 1090, 13],
      ["contact", "stone", .44, .12, .19, 565, .0008],
    ]);
  },
} satisfies SoundRecipe;
