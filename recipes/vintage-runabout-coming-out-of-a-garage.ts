import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-ignition.ts';
import source2 from './_recordings/demo-garage-motor.ts';

export default {
  id: "vintage-runabout-coming-out-of-a-garage",
  name: "Vintage Runabout Coming Out of a Garage",
  category: "Vehicles & Engines",
  tags: ["vintage", "runabout", "coming", "garage", "vehicle"],
  loopable: false,
  durationSec: 4.39,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.55, 0.61, 0.11, 1484, 0.013, 0.56],
      ['clip', source2, 1.05, 3.18, 0.73, 0.49, 4452, 0.57, 0.33],
      ["contact", "stone", 1.36, 0.41, 0.29, 322, 0.002],
    ]);
  },
} satisfies SoundRecipe;
