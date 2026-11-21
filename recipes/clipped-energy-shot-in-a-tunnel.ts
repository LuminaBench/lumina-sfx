import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "clipped-energy-shot-in-a-tunnel",
  name: "Clipped Energy Shot in a Tunnel",
  category: "Impacts",
  tags: ["clipped", "energy", "shot", "tunnel"],
  loopable: false,
  durationSec: 1.29,
  targetRmsDbfs: -22,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, .20, .65, 815, .001],
      ["tone", .005, .46, .65, 1352, 323, .005, .89],
      ["tone", .17, .38, .26, 520, 330, .005, .62],
      ["tone", .43, .46, .17, 380, 216, .008, .43],
    ]);
  },
} satisfies SoundRecipe;
