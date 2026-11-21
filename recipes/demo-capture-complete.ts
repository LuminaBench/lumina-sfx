import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "demo-capture-complete",
  name: "Demo Capture Complete",
  category: "Sci-Fi & UI",
  tags: ["demo", "capture", "complete"],
  loopable: false,
  durationSec: 1.02,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["tone", 0, .34, .52, 722, 742, .012, .43],
      ["tone", .184, .56, .50, 992, 1182, .012, .24],
      ["tone", .495, .43, .29, 664, 601, .017, .31],
    ]);
  },
} satisfies SoundRecipe;
