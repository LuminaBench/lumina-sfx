import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "pocket-device-wake-tone",
  name: "Pocket Device Wake Tone",
  category: "Sci-Fi & UI",
  tags: ["pocket", "device", "wake", "tone"],
  loopable: false,
  durationSec: 0.72,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "rubber", 0, .10, .54, 475, .001],
      ["tone", .030, .2, .56, 399, 421, .009, .22],
      ["tone", .185, .41, .44, 754, 766, .011, .24],
    ]);
  },
} satisfies SoundRecipe;
