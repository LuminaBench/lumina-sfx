import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-ignition.ts';
import source2 from './_recordings/demo-garage-motor.ts';

export default {
  id: "engine-startup-heard-from-the-garage-door",
  name: "Engine Startup Heard from the Garage Door",
  category: "Vehicles & Engines",
  tags: ["engine", "startup", "heard", "garage", "door", "vehicle"],
  loopable: false,
  durationSec: 5.3,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 3.83, .68, .08, 4800, .01, .23],
      ['clip', source2, 1.12, 3.85, .50, .19, 8200, .27, .4],
    ]);
  },
} satisfies SoundRecipe;
