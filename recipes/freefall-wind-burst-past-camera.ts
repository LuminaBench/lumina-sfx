import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-flag-rush.ts';

export default {
  id: "freefall-wind-burst-past-camera",
  name: "Freefall Wind Burst past Camera",
  category: "Weather & Ambience",
  tags: ["freefall", "wind", "burst", "past", "camera", "ambience"],
  loopable: false,
  durationSec: 2.2,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, 2.16, .80, 1630, .26],
      ["brush", "air", .03, 1.9, .48, 370, .26],
      ['clip', source, .29, 1.75, .29, .48, 4900, .24, .23],
    ]);
  },
} satisfies SoundRecipe;
