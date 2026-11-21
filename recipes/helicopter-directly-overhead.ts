import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-rotor-pass.ts';

export default {
  id: "helicopter-directly-overhead",
  name: "Helicopter Directly Overhead",
  category: "Aircraft",
  tags: ["helicopter", "directly", "overhead"],
  loopable: false,
  durationSec: 8.3,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 8.18, .96, .04, 11000, .017, .4],
    ]);
  },
} satisfies SoundRecipe;
