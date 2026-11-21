import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motorcycle-road-pass.ts';

export default {
  id: "open-road-motorcycle-over-a-short-raised-joint",
  name: "Open Road Motorcycle Over a Short Raised Joint",
  category: "Vehicles & Engines",
  tags: ["open", "road", "motorcycle", "short", "raised", "joint", "vehicle"],
  loopable: false,
  durationSec: 1.43,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.3, 0.45, 0.23, 5200, 0.007, 0.08],
      ["contact", "rubber", 0.16, 0.34, 0.59, 240, 0.002],
      ["contact", "rubber", 0.57, 0.49, 0.61, 164, 0.002],
      ["grains", "stone", 0.55, 0.71, 0.21, 770, 13],
    ]);
  },
} satisfies SoundRecipe;
