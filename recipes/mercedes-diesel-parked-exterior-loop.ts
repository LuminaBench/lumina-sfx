import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-mercedes-diesel.ts';

export default {
  id: "mercedes-diesel-parked-exterior-loop",
  name: "Mercedes diesel parked exterior loop",
  category: "Vehicles & Engines",
  tags: ["mercedes", "diesel", "parked", "exterior", "car", "engine", "vehicle"],
  loopable: true,
  durationSec: 5.7,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.82, 1, .36, 5200, 0, 0],
    ]);
  },
} satisfies SoundRecipe;
