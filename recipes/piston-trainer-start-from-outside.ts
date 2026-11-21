import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-prop-pass.ts';

export default {
  id: "piston-trainer-start-from-outside",
  name: "Piston Trainer Start from Outside",
  category: "Aircraft",
  tags: ["piston", "trainer", "start", "outside"],
  loopable: false,
  durationSec: 4.38,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, 0.12, 0.31, 498, 0.002],
      ['clip', source, 0.04, 4.1, 0.58, 0.05, 3300, 0.025, 0.45],
      ["motor", 0.15, 3.45, 0.31, 38.13, 128.34, 0.56, 0.51],
      ["brush", "air", 0.51, 2.9, 0.27, 350, 0.55],
    ]);
  },
} satisfies SoundRecipe;
