import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-garage-motor.ts';

export default {
  id: "airport-service-tug-start-from-outside",
  name: "Airport Service Tug Start from Outside",
  category: "Aircraft",
  tags: ["airport", "service", "tug", "start", "outside"],
  loopable: false,
  durationSec: 4.2,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, 0.12, 0.31, 474, 0.002],
      ['clip', source, 0.04, 3.992, 0.58, 0.05, 2250, 0.025, 0.45],
      ["motor", 0.15, 3.45, 0.31, 28.29, 95.22, 0.56, 0.51],
      ["brush", "air", 0.51, 2.9, 0.27, 270, 0.55],
    ]);
  },
} satisfies SoundRecipe;
