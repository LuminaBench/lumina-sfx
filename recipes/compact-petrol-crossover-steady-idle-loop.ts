import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-saturn-idle.ts';

export default {
  id: "compact-petrol-crossover-steady-idle-loop",
  name: "Compact petrol crossover steady idle loop",
  category: "Vehicles & Engines",
  tags: ["compact", "petrol", "crossover", "steady", "idle", "car", "engine", "vehicle"],
  loopable: true,
  durationSec: 5.5,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.62, 1, .22, 6200, 0, 0],
    ]);
  },
} satisfies SoundRecipe;
