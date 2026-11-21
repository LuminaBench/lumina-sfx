import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-garage-motor.ts';
import source2 from './_recordings/car-dirt-road-pass.ts';

export default {
  id: "small-car-pull-out-across-a-driveway",
  name: "Small Car Pull-out across a Driveway",
  category: "Vehicles & Engines",
  tags: ["small", "car", "pull", "across", "driveway", "vehicle"],
  loopable: false,
  durationSec: 5.6,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.48, .88, .09, 8600, .022, .33],
      ['clip', source2, .62, 3.46, .28, .13, 4800, .14, .45],
    ]);
  },
} satisfies SoundRecipe;
