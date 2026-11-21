import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sport-exterior.ts';

export default {
  id: "tuned-coupe-coast-and-exhaust-burble",
  name: "Tuned coupe coast and exhaust burble",
  category: "Vehicles & Engines",
  tags: ["tuned", "coupe", "coast", "exhaust", "burble", "car", "engine", "vehicle"],
  loopable: false,
  durationSec: 2.9,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.81, .73, .81, 3700, .015, .38],
      ["contact", "air", 0, .075, .2, 280, .002],
      ["motor", .06, 2.35, .18, 156, 61, .008, .63],
      ["contact", "air", .92, .17, .29, 114, .004],
      ["contact", "air", 1.71, .13, .22, 96, .003],
    ]);
  },
} satisfies SoundRecipe;
