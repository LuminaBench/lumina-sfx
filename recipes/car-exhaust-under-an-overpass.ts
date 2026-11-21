import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sport-exterior.ts';
import source2 from './_recordings/demo-sport-v8.ts';

export default {
  id: "car-exhaust-under-an-overpass",
  name: "Car Exhaust under an Overpass",
  category: "Vehicles & Engines",
  tags: ["car", "exhaust", "under", "an", "overpass", "vehicle"],
  loopable: false,
  durationSec: 4.4,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 4.36, .62, .22, 3000, .027, .17],
      ['clip', source, .062, 3.88, .22, .24, 1720, .038, .44],
      ['clip', source2, .91, 1.85, .22, .08, 4100, .20, .21],
    ]);
  },
} satisfies SoundRecipe;
