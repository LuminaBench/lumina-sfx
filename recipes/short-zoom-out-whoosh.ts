import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "short-zoom-out-whoosh",
  name: "Short Zoom-out Whoosh",
  category: "Sci-Fi & UI",
  tags: ["short", "zoom", "whoosh"],
  loopable: false,
  durationSec: 0.85,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, .83, .77, 1510, .059],
      ["tone", .029, .71, .33, 486, 137, .088, .52],
      ["brush", "cloth", .29, .45, .29, 435, .05],
    ]);
  },
} satisfies SoundRecipe;
