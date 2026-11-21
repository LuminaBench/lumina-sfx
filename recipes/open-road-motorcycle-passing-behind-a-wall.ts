import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motorcycle-road-pass.ts';

export default {
  id: "open-road-motorcycle-passing-behind-a-wall",
  name: "Open Road Motorcycle Passing behind a Wall",
  category: "Vehicles & Engines",
  tags: ["open", "road", "motorcycle", "passing", "wall", "vehicle"],
  loopable: false,
  durationSec: 4.92,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.81, 0.72, 0.53, 7280, 0.04, 0.7],
      ['clip', source, 1.37, 3.35, 0.52, 0.88, 1456, 0.51, 0.94],
      ["brush", "air", 1.17, 3.24, 0.24, 410, 0.26],
    ]);
  },
} satisfies SoundRecipe;
