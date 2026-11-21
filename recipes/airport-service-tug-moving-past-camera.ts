import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-garage-motor.ts';

export default {
  id: "airport-service-tug-moving-past-camera",
  name: "Airport Service Tug Moving Past Camera",
  category: "Aircraft",
  tags: ["airport", "service", "tug", "moving", "past", "camera"],
  loopable: false,
  durationSec: 5.22,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.0676, 0.81, 0.22, 2535, 0.035, 0.66],
      ["motor", 0.15, 4.65, 0.09, 98.67, 50.37, 1, 0.55],
      ["brush", "air", 0.41, 4.35, 0.27, 702, 0.88],
    ]);
  },
} satisfies SoundRecipe;
