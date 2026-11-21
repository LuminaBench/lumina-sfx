import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-mercedes-diesel.ts';
import source2 from './_recordings/motion-diesel-hood.ts';

export default {
  id: "heavy-truck-gearbox-taking-load",
  name: "Heavy truck gearbox taking load",
  category: "Vehicles & Engines",
  tags: ["heavy", "truck", "gearbox", "taking", "load", "car", "engine", "vehicle"],
  loopable: false,
  durationSec: 3.8,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 3.44, .6, 2.44, 2300, .012, .53],
      ['clip', source2, 1.24, 2.56, .60, 2.13, 1650, .32, .28],
      ["motor", 0, 1.63, .22, 68, 111, .002, .64],
      ["motor", 1.39, 2.21, .27, 88, 133, .074, .71],
    ]);
  },
} satisfies SoundRecipe;
