import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-diesel-hood.ts';

export default {
  id: "diesel-v6-under-open-hood-loop",
  name: "Diesel V6 under open hood loop",
  category: "Vehicles & Engines",
  tags: ["diesel", "v6", "under", "open", "hood", "car", "engine", "vehicle"],
  loopable: true,
  durationSec: 5.6,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.72, 1, .32, 4500, 0, 0],
    ]);
  },
} satisfies SoundRecipe;
