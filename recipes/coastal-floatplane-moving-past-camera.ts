import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-prop-pass.ts';

export default {
  id: "coastal-floatplane-moving-past-camera",
  name: "Coastal Floatplane Moving Past Camera",
  category: "Aircraft",
  tags: ["coastal", "floatplane", "moving", "past", "camera"],
  loopable: false,
  durationSec: 5.41,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.241, 0.81, 0.22, 3718, 0.035, 0.66],
      ["motor", 0.15, 4.65, 0.09, 167.31, 85.41, 1, 0.55],
      ["brush", "air", 0.41, 4.35, 0.27, 1014, 0.88],
    ]);
  },
} satisfies SoundRecipe;
