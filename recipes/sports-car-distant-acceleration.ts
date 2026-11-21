import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sport-exterior.ts';

export default {
  id: "sports-car-distant-acceleration",
  name: "Sports Car Distant Acceleration",
  category: "Vehicles & Engines",
  tags: ["sports", "car", "distant", "acceleration", "vehicle"],
  loopable: false,
  durationSec: 4.4,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 4.28, 1, .24, 7200, .014, .19],
    ]);
  },
} satisfies SoundRecipe;
