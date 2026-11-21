import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-garage-start.ts';

export default {
  id: "petrol-cold-start-inside-concrete-garage",
  name: "Petrol cold start inside concrete garage",
  category: "Vehicles & Engines",
  tags: ["petrol", "cold", "start", "inside", "concrete", "garage", "car", "engine", "vehicle"],
  loopable: false,
  durationSec: 2.25,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.25, 1, .005, 8400, .002, .18],
      ["contact", "iron", 0, .052, .11, 390, .0007],
    ]);
  },
} satisfies SoundRecipe;
