import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sport-v8.ts';

export default {
  id: "sports-car-full-pull-from-driver-seat",
  name: "Sports Car Full Pull from Driver Seat",
  category: "Vehicles & Engines",
  tags: ["sports", "car", "full", "pull", "driver", "seat", "vehicle"],
  loopable: false,
  durationSec: 2.3,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.97, .88, .003, 9000, .008, .10],
      ["brush", "air", .55, 1.58, .29, 1180, .24],
    ]);
  },
} satisfies SoundRecipe;
