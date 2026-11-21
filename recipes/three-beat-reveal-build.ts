import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "three-beat-reveal-build",
  name: "Three Beat Reveal Build",
  category: "Sci-Fi & UI",
  tags: ["three", "beat", "reveal", "build"],
  loopable: false,
  durationSec: 1.83,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "wood", 0, .26, .65, 230, .003],
      ["contact", "wood", .55, .26, .66, 323, .003],
      ["contact", "wood", .92, .27, .69, 411, .003],
      ["tone", 1.17, .56, .53, 267, 271, .01, .32],
      ["brush", "air", .46, 1.25, .29, 1260, .24],
    ]);
  },
} satisfies SoundRecipe;
