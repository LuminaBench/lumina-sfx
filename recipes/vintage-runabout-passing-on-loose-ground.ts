import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-garage-motor.ts';

export default {
  id: "vintage-runabout-passing-on-loose-ground",
  name: "Vintage Runabout Passing on Loose Ground",
  category: "Vehicles & Engines",
  tags: ["vintage", "runabout", "passing", "loose", "ground", "vehicle"],
  loopable: false,
  durationSec: 4.81,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 4.69, 0.72, 0.07, 4200, 0.03, 0.53],
      ["grains", "soil", 0.02, 4.2, 0.28, 950, 41],
      ["brush", "air", 0.39, 3.63, 0.29, 840, 0.63],
    ]);
  },
} satisfies SoundRecipe;
