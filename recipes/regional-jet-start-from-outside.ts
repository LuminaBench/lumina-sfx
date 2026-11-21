import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-airliner-approach.ts';

export default {
  id: "regional-jet-start-from-outside",
  name: "Regional Jet Start from Outside",
  category: "Aircraft",
  tags: ["regional", "jet", "start", "outside"],
  loopable: false,
  durationSec: 4.85,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, 0.12, 0.31, 648, 0.002],
      ['clip', source, 0.04, 4.3925, 0.58, 0.05, 7200, 0.025, 0.45],
      ["motor", 0.15, 3.45, 0.31, 99.63, 335.34, 0.56, 0.51],
      ["brush", "air", 0.51, 2.9, 0.27, 1250, 0.55],
    ]);
  },
} satisfies SoundRecipe;
