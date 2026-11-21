import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-tracked-reverse.ts';

export default {
  id: "tracked-bulldozer-reversing-machinery-loop",
  name: "Tracked bulldozer reversing machinery loop",
  category: "Vehicles & Engines",
  tags: ["tracked", "bulldozer", "reversing", "machinery", "vehicle"],
  loopable: true,
  durationSec: 6.15,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 6.27, .95, .27, 6300, 0, 0],
    ]);
  },
} satisfies SoundRecipe;
