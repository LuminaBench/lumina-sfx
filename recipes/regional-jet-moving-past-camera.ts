import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-airliner-approach.ts';

export default {
  id: "regional-jet-moving-past-camera",
  name: "Regional Jet Moving Past Camera",
  category: "Aircraft",
  tags: ["regional", "jet", "moving", "past", "camera"],
  loopable: false,
  durationSec: 5.71,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.5215, 0.81, 0.22, 8112, 0.035, 0.66],
      ["motor", 0.15, 4.65, 0.09, 347.49, 177.39, 1, 0.55],
      ["brush", "air", 0.41, 4.35, 0.27, 3250, 0.88],
    ]);
  },
} satisfies SoundRecipe;
