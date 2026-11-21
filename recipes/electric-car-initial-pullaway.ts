import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-ev-surface.ts';

export default {
  id: "electric-car-initial-pullaway",
  name: "Electric Car Initial Pullaway",
  category: "Vehicles & Engines",
  tags: ["electric", "car", "initial", "pullaway", "vehicle"],
  loopable: false,
  durationSec: 4.9,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 4.75, .93, .18, 8300, .013, .25],
      ["motor", .43, 3.54, .054, 177, 393, .37, .35],
    ]);
  },
} satisfies SoundRecipe;
