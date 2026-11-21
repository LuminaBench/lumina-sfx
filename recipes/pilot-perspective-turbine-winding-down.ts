import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-turbine-idle.ts';

export default {
  id: "pilot-perspective-turbine-winding-down",
  name: "Pilot perspective turbine winding down",
  category: "Aircraft",
  tags: ["pilot", "perspective", "turbine", "winding", "down", "flight", "jet"],
  loopable: false,
  durationSec: 4.2,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 3.7, .49, .30, 3450, .009, 1.45],
      ["motor", 0, 3.56, .26, 830, 149, .007, .6],
      ["brush", "air", .07, 3.82, .52, 1750, .06],
      ["contact", "iron", 2.17, .13, .15, 1080, .001],
      ["contact", "iron", 3.43, .09, .21, 1710, .001],
    ]);
  },
} satisfies SoundRecipe;
