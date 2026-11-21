import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "decommissioned-conduit-arc",
  name: "Decommissioned Conduit Arc",
  category: "Sci-Fi & UI",
  tags: ["decommissioned", "conduit", "arc"],
  loopable: false,
  durationSec: 1.27,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["grains", "glass", 0, .99, .66, 3130, 11],
      ["tone", .021, .29, .37, 1720, 578, .001, .76],
      ["contact", "rubber", .19, .34, .32, 230, .014],
      ["tone", .68, .31, .23, 677, 215, .002, .94],
    ]);
  },
} satisfies SoundRecipe;
