import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-trail-bike-surge.ts';

export default {
  id: "trail-bike-light-throttle-surge-rider-perspective",
  name: "Trail bike light throttle surge rider perspective",
  category: "Vehicles & Engines",
  tags: ["trail", "bike", "light", "throttle", "surge", "rider", "perspective", "vehicle"],
  loopable: false,
  durationSec: 4.22,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 4.22, .95, .05, 8600, .004, .44],
      ["contact", "air", 0, .07, .09, 795, .003],
    ]);
  },
} satisfies SoundRecipe;
