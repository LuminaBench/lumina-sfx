import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-plane-overhead.ts';

export default {
  id: "commuter-turboprop-moving-past-camera",
  name: "Commuter Turboprop Moving Past Camera",
  category: "Aircraft",
  tags: ["commuter", "turboprop", "moving", "past", "camera"],
  loopable: false,
  durationSec: 5.54,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.3685, 0.81, 0.22, 5746, 0.035, 0.66],
      ["motor", 0.15, 4.65, 0.09, 245.96, 125.56, 1, 0.55],
      ["brush", "air", 0.41, 4.35, 0.27, 1222, 0.88],
    ]);
  },
} satisfies SoundRecipe;
