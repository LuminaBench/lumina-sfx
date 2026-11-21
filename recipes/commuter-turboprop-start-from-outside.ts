import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-plane-overhead.ts';

export default {
  id: "commuter-turboprop-start-from-outside",
  name: "Commuter Turboprop Start from Outside",
  category: "Aircraft",
  tags: ["commuter", "turboprop", "start", "outside"],
  loopable: false,
  durationSec: 4.64,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, 0.12, 0.31, 577, 0.002],
      ['clip', source, 0.04, 4.2575, 0.58, 0.05, 5100, 0.025, 0.45],
      ["motor", 0.15, 3.45, 0.31, 70.52, 237.36, 0.56, 0.51],
      ["brush", "air", 0.51, 2.9, 0.27, 470, 0.55],
    ]);
  },
} satisfies SoundRecipe;
