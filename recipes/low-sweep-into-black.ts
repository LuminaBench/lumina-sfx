import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "low-sweep-into-black",
  name: "Low Sweep into Black",
  category: "Sci-Fi & UI",
  tags: ["low", "sweep", "black"],
  loopable: false,
  durationSec: 1.39,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, 1.27, .49, 625, .072],
      ["tone", 0, 1.27, .70, 157, 48, .10, .55],
      ["tone", .29, .75, .26, 97, 49, .19, .46],
    ]);
  },
} satisfies SoundRecipe;
