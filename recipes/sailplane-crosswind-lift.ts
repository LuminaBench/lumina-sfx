import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-canopy-rustle.ts';

export default {
  id: "sailplane-crosswind-lift",
  name: "Sailplane Crosswind Lift",
  category: "Aircraft",
  tags: ["sailplane", "crosswind", "lift"],
  loopable: false,
  durationSec: 5.4,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, 5.21, 0.81, 1530, 1.02],
      ["brush", "air", 0.59, 4.34, 0.42, 450, 0.7],
      ['clip', source, 0.41, 3.5, 0.13, 0.12, 4880, 0.46, 0.8],
    ]);
  },
} satisfies SoundRecipe;
