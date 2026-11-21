import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-farm-marsh.ts';

export default {
  id: "cold-reed-shore-gust-peaks-over-camera",
  name: "Cold Reed Shore Gust Peaks over Camera",
  category: "Weather & Ambience",
  tags: ["cold", "reed", "shore", "gust", "peaks", "camera", "ambience"],
  loopable: false,
  durationSec: 4.66,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, 3.78, 0.66, 1200.6, 0.65],
      ['clip', source, 0.3, 3.65, 0.39, 0.81, 4202.1, 0.29, 0.7],
      ["grains", "plant", 0.38, 3.14, 0.29, 1055.7, 26],
      ["brush", "plant", 1.14, 2.84, 0.23, 287, 0.48],
    ]);
  },
} satisfies SoundRecipe;
