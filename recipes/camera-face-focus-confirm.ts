import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "camera-face-focus-confirm",
  name: "Camera Face Focus Confirm",
  category: "Sci-Fi & UI",
  tags: ["camera", "face", "focus", "confirm"],
  loopable: false,
  durationSec: 0.46,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "rubber", 0, .12, .61, 640, .001],
      ["tone", .061, .31, .56, 827, 844, .014, .2],
      ["contact", "glass", .217, .13, .18, 1050, .001],
    ]);
  },
} satisfies SoundRecipe;
