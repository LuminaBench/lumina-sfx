import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-ocean.ts';

export default {
  id: "windward-headland-gust-peaks-over-camera",
  name: "Windward Headland Gust Peaks over Camera",
  category: "Weather & Ambience",
  tags: ["windward", "headland", "gust", "peaks", "camera", "ambience"],
  loopable: false,
  durationSec: 5.18,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, 3.78, 0.66, 1496.4, 0.78],
      ['clip', source, 0.3, 3.65, 0.39, 0.81, 5237.4, 0.29, 0.7],
      ["grains", "stone", 0.38, 3.14, 0.29, 1315.8, 26],
      ["brush", "stone", 1.14, 2.84, 0.23, 495, 0.48],
    ]);
  },
} satisfies SoundRecipe;
