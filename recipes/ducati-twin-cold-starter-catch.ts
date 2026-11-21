import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-ducati-start.ts';

export default {
  id: "ducati-twin-cold-starter-catch",
  name: "Ducati twin cold starter catch",
  category: "Vehicles & Engines",
  tags: ["ducati", "twin", "cold", "starter", "catch", "vehicle"],
  loopable: false,
  durationSec: 3.45,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 3.45, 1, .01, 11000, .002, .3],
      ["contact", "iron", 0, .035, .10, 810, .0008],
    ]);
  },
} satisfies SoundRecipe;
