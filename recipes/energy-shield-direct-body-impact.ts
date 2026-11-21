import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "energy-shield-direct-body-impact",
  name: "Energy shield direct body impact",
  category: "Weapons",
  tags: ["energy", "shield", "direct", "body", "impact"],
  loopable: false,
  durationSec: 0.81,
  targetRmsDbfs: -24.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, .175, .7, 287, .0009],
      ["contact", "glass", 0, .092, .53, 1010, .00066],
      ["tone", 0, .57, .31, 583, 1003, .007, .9],
      ["tone", .014, .48, .19, 1640, 3120, .004, .69],
      ["brush", "air", .066, .42, .27, 2605, .012],
    ]);
  },
} satisfies SoundRecipe;
