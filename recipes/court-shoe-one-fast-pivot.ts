import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/sneaker-pivot-squeak.ts';

export default {
  id: "court-shoe-one-fast-pivot",
  name: "Court Shoe One Fast Pivot",
  category: "Impacts",
  tags: ["court", "shoe", "one", "fast", "pivot"],
  loopable: false,
  durationSec: 0.72,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.65, 0.76, 0.03, 7280, 0.007, 0.08],
      ["contact", "rubber", 0.014, 0.24, 0.57, 570, 0.002],
      ["grains", "rubber", 0.064, 0.47, 0.15, 1048.8, 9],
    ]);
  },
} satisfies SoundRecipe;
