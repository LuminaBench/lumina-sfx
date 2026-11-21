import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-saturn-start.ts';

export default {
  id: "compact-petrol-crossover-key-start",
  name: "Compact petrol crossover key start",
  category: "Vehicles & Engines",
  tags: ["compact", "petrol", "crossover", "key", "start", "car", "engine", "vehicle"],
  loopable: false,
  durationSec: 3.2,
  targetRmsDbfs:  -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 3.2, 1, .05, 7800, .004, .25],
      ["contact", "iron", 0, .042, .12, 515, .001],
    ]);
  },
} satisfies SoundRecipe;
