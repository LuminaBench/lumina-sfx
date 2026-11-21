import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sheltered-wind.ts';

export default {
  id: "narrow-sandstone-canyon-gust-peaks-over-camera",
  name: "Narrow Sandstone Canyon Gust Peaks over Camera",
  category: "Weather & Ambience",
  tags: ["narrow", "sandstone", "canyon", "gust", "peaks", "camera", "ambience"],
  loopable: false,
  durationSec: 4.74,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, 3.78, 0.66, 817.8, 0.67],
      ['clip', source, 0.3, 3.65, 0.39, 0.81, 2862.3, 0.29, 0.7],
      ["grains", "stone", 0.38, 3.14, 0.29, 719.1, 26],
      ["brush", "stone", 1.14, 2.84, 0.23, 260, 0.48],
    ]);
  },
} satisfies SoundRecipe;
