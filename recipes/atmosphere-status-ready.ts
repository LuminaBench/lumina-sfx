import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "atmosphere-status-ready",
  name: "Atmosphere Status Ready",
  category: "Sci-Fi & UI",
  tags: ["atmosphere", "status", "ready"],
  loopable: false,
  durationSec: 0.62,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "rubber", 0, .09, .43, 470, .001],
      ["tone", .02, .21, .59, 523, 541, .007, .21],
      ["tone", .14, .29, .72, 763, 784, .009, .16],
      ["grains", "glass", .19, .32, .08, 1370, 5],
    ]);
  },
} satisfies SoundRecipe;
