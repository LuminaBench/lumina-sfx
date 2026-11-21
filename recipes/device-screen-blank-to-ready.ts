import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "device-screen-blank-to-ready",
  name: "Device Screen Blank to Ready",
  category: "Sci-Fi & UI",
  tags: ["device", "screen", "blank", "ready"],
  loopable: false,
  durationSec: 1.18,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, .79, .52, 1400, .107],
      ["tone", .11, .81, .45, 227, 651, .18, .65],
      ["tone", .515, .6, .38, 755, 758, .05, .4],
    ]);
  },
} satisfies SoundRecipe;
