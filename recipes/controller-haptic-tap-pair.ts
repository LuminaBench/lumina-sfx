import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "controller-haptic-tap-pair",
  name: "Controller Haptic Tap Pair",
  category: "Sci-Fi & UI",
  tags: ["controller", "haptic", "tap", "pair"],
  loopable: false,
  durationSec: 0.49,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "rubber", 0, .16, .68, 176, .001],
      ["contact", "rubber", .089, .17, .53, 205, .002],
      ["tone", .016, .27, .22, 118, 105, .011, .73],
    ]);
  },
} satisfies SoundRecipe;
