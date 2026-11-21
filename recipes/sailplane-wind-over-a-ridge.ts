import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sheltered-wind.ts';

export default {
  id: "sailplane-wind-over-a-ridge",
  name: "Sailplane Wind over a Ridge",
  category: "Aircraft",
  tags: ["sailplane", "wind", "ridge"],
  loopable: false,
  durationSec: 5.9,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, 5.61, 0.64, 1120, 0.96],
      ['clip', source, 0.23, 5.2, 0.44, 3.75, 4600, 0.64, 0.92],
      ["brush", "air", 1.84, 3.53, 0.32, 580, 0.4],
    ]);
  },
} satisfies SoundRecipe;
