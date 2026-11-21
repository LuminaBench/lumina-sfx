import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-corn-rustle.ts';

export default {
  id: "alpine-treeline-gust-peaks-over-camera",
  name: "Alpine Treeline Gust Peaks over Camera",
  category: "Weather & Ambience",
  tags: ["alpine", "treeline", "gust", "peaks", "camera", "ambience"],
  loopable: false,
  durationSec: 4.54,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, 3.78, 0.66, 1299.2, 0.62],
      ['clip', source, 0.3, 3.65, 0.39, 0.81, 4547.2, 0.29, 0.7],
      ["grains", "plant", 0.38, 3.14, 0.29, 1142.4, 26],
      ["brush", "plant", 1.14, 2.84, 0.23, 320, 0.48],
    ]);
  },
} satisfies SoundRecipe;
