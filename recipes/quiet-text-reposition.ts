import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "quiet-text-reposition",
  name: "Quiet Text Reposition",
  category: "Sci-Fi & UI",
  tags: ["quiet", "text", "reposition"],
  loopable: false,
  durationSec: 0.42,
  targetRmsDbfs: -30,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "cloth", 0, .31, .70, 810, .052],
      ["contact", "paper", .142, .18, .51, 630, .003],
    ]);
  },
} satisfies SoundRecipe;
