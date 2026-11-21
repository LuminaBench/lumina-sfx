import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-yamaha-stroke.ts';

export default {
  id: "yamaha-125-two-stroke-steady-idle-loop",
  name: "Yamaha 125 two-stroke steady idle loop",
  category: "Vehicles & Engines",
  tags: ["yamaha", "125", "two", "stroke", "steady", "idle", "vehicle"],
  loopable: true,
  durationSec: 5.55,
  targetRmsDbfs: -25.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.67, 1, .18, 7200, 0, 0],
    ]);
  },
} satisfies SoundRecipe;
