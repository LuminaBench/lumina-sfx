import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-prop-pass.ts';

export default {
  id: "coastal-floatplane-start-from-outside",
  name: "Coastal Floatplane Start from Outside",
  category: "Aircraft",
  tags: ["coastal", "floatplane", "start", "outside"],
  loopable: false,
  durationSec: 4.45,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, 0.12, 0.31, 522, 0.002],
      ['clip', source, 0.04, 4.145, 0.58, 0.05, 3300, 0.025, 0.45],
      ["motor", 0.15, 3.45, 0.31, 47.97, 161.46, 0.56, 0.51],
      ["brush", "air", 0.51, 2.9, 0.27, 390, 0.55],
    ]);
  },
} satisfies SoundRecipe;
