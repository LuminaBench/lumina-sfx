import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-metro-bridge.ts';

export default {
  id: "subway-passing-under-bridge",
  name: "Subway Passing under Bridge",
  category: "Vehicles & Engines",
  tags: ["subway", "passing", "under", "bridge", "vehicle"],
  loopable: false,
  durationSec: 8.9,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 8.7, .93, .15, 9200, .031, .38],
      ['clip', source, .055, 8.55, .23, .14, 1400, .031, .41],
    ]);
  },
} satisfies SoundRecipe;
