import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "demo-record-armed",
  name: "Demo Record Armed",
  category: "Sci-Fi & UI",
  tags: ["demo", "record", "armed"],
  loopable: false,
  durationSec: 0.76,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["tone", 0, .28, .46, 479, 497, .029, .27],
      ["tone", .181, .47, .58, 748, 756, .023, .31],
      ["contact", "rubber", .34, .18, .31, 612, .002],
    ]);
  },
} satisfies SoundRecipe;
