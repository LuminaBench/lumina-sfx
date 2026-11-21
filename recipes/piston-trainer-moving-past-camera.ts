import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-prop-pass.ts';

export default {
  id: "piston-trainer-moving-past-camera",
  name: "Piston Trainer Moving Past Camera",
  category: "Aircraft",
  tags: ["piston", "trainer", "moving", "past", "camera"],
  loopable: false,
  durationSec: 5.35,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.19, 0.81, 0.22, 3718, 0.035, 0.66],
      ["motor", 0.15, 4.65, 0.09, 132.99, 67.89, 1, 0.55],
      ["brush", "air", 0.41, 4.35, 0.27, 910, 0.88],
    ]);
  },
} satisfies SoundRecipe;
