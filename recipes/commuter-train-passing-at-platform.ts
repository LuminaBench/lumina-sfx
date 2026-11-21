import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-passenger-train.ts';

export default {
  id: "commuter-train-passing-at-platform",
  name: "Commuter Train Passing at Platform",
  category: "Vehicles & Engines",
  tags: ["commuter", "train", "passing", "platform", "vehicle"],
  loopable: false,
  durationSec: 8.0,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 7.85, .95, .21, 10600, .024, .40],
    ]);
  },
} satisfies SoundRecipe;
