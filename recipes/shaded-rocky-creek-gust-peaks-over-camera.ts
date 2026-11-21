import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-brook-bed.ts';

export default {
  id: "shaded-rocky-creek-gust-peaks-over-camera",
  name: "Shaded Rocky Creek Gust Peaks over Camera",
  category: "Weather & Ambience",
  tags: ["shaded", "rocky", "creek", "gust", "peaks", "camera", "ambience"],
  loopable: false,
  durationSec: 4.78,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, 3.78, 0.66, 1890.8, 0.68],
      ['clip', source, 0.3, 3.65, 0.39, 0.81, 6617.8, 0.29, 0.7],
      ["grains", "water", 0.38, 3.14, 0.29, 1662.6, 26],
      ["brush", "water", 1.14, 2.84, 0.23, 740, 0.48],
    ]);
  },
} satisfies SoundRecipe;
