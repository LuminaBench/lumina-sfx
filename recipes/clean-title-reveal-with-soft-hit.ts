import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "clean-title-reveal-with-soft-hit",
  name: "Clean Title Reveal with Soft Hit",
  category: "Sci-Fi & UI",
  tags: ["clean", "title", "reveal", "soft", "hit"],
  loopable: false,
  durationSec: 1.52,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, 1.12, .51, 1620, .39],
      ["contact", "rubber", .53, .37, .58, 204, .003],
      ["tone", .56, .80, .42, 392, 396, .019, .39],
      ["tone", .635, .73, .31, 588, 586, .025, .36],
    ]);
  },
} satisfies SoundRecipe;
