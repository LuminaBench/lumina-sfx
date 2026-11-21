import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-ignition.ts';

export default {
  id: "car-engine-cold-crank",
  name: "Car Engine Cold Crank",
  category: "Vehicles & Engines",
  tags: ["car", "engine", "cold", "crank", "vehicle"],
  loopable: false,
  durationSec: 3.1,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.95, .95, .036, 9100, .015, .18],
      ["contact", "rubber", .35, .28, .24, 172, .003],
    ]);
  },
} satisfies SoundRecipe;
