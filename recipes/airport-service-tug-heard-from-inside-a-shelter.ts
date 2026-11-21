import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-garage-motor.ts';

export default {
  id: "airport-service-tug-heard-from-inside-a-shelter",
  name: "Airport Service Tug Heard from Inside a Shelter",
  category: "Aircraft",
  tags: ["airport", "service", "tug", "heard", "inside", "shelter"],
  loopable: false,
  durationSec: 5.72,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.354, 0.75, 0.15, 720, 0.022, 0.73],
      ['clip', source, 0.068, 4.85, 0.15, 0.17, 375, 0.018, 0.82],
      ["brush", "air", 0.26, 3.95, 0.2, 194.4, 0.34],
    ]);
  },
} satisfies SoundRecipe;
