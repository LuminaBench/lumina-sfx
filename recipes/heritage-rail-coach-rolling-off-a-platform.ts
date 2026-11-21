import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-rail-joints.ts';

export default {
  id: "heritage-rail-coach-rolling-off-a-platform",
  name: "Heritage Rail Coach Rolling off a Platform",
  category: "Vehicles & Engines",
  tags: ["heritage", "rail", "coach", "rolling", "platform", "vehicle"],
  loopable: false,
  durationSec: 5.6,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.43, 0.88, 0.21, 3618, 0.032, 0.28],
      ["motor", 0.05, 5.1, 0.17, 88.16, 228, 0.67, 0.43],
      ["grains", "iron", 0.32, 4.3, 0.12, 567, 43],
    ]);
  },
} satisfies SoundRecipe;
