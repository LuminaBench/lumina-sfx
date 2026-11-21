import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sports-gear.ts';
import source2 from './_recordings/demo-sport-exterior.ts';

export default {
  id: "engine-camera-cut-from-interior-to-exterior",
  name: "Engine Camera Cut from Interior to Exterior",
  category: "Vehicles & Engines",
  tags: ["engine", "camera", "cut", "interior", "exterior", "vehicle"],
  loopable: false,
  durationSec: 4.9,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.38, .76, .13, 2160, .014, .72],
      ['clip', source2, 1.28, 3.51, .74, .40, 9200, .78, .37],
    ]);
  },
} satisfies SoundRecipe;
