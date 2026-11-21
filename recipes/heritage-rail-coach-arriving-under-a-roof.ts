import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-rail-joints.ts';

export default {
  id: "heritage-rail-coach-arriving-under-a-roof",
  name: "Heritage Rail Coach Arriving under a Roof",
  category: "Vehicles & Engines",
  tags: ["heritage", "rail", "coach", "arriving", "under", "roof", "vehicle"],
  loopable: false,
  durationSec: 5.2,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.12, 0.81, 0.49, 3051, 0.021, 0.46],
      ['clip', source, 0.058, 4.9, 0.23, 0.55, 1215, 0.025, 0.54],
      ["contact", "rubber", 3.9, 0.62, 0.23, 152, 0.002],
    ]);
  },
} satisfies SoundRecipe;
