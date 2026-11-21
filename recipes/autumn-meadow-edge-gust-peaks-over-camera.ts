import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-stalk-bed.ts';

export default {
  id: "autumn-meadow-edge-gust-peaks-over-camera",
  name: "Autumn Meadow Edge Gust Peaks over Camera",
  category: "Weather & Ambience",
  tags: ["autumn", "meadow", "edge", "gust", "peaks", "camera", "ambience"],
  loopable: false,
  durationSec: 4.42,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, 3.78, 0.66, 1363, 0.59],
      ['clip', source, 0.3, 3.65, 0.39, 0.81, 4770.5, 0.29, 0.7],
      ["grains", "plant", 0.38, 3.14, 0.29, 1198.5, 26],
      ["brush", "plant", 1.14, 2.84, 0.23, 360, 0.48],
    ]);
  },
} satisfies SoundRecipe;
