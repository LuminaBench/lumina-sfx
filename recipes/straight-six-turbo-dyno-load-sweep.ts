import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-straight-six-pull.ts';

export default {
  id: "straight-six-turbo-dyno-load-sweep",
  name: "Straight-six turbo dyno load sweep",
  category: "Vehicles & Engines",
  tags: ["straight", "six", "turbo", "dyno", "load", "sweep", "car", "engine", "vehicle"],
  loopable: false,
  durationSec: 3.72,
  targetRmsDbfs: -23.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 3.72, 1, .065, 8000, .002, .23],
    ]);
  },
} satisfies SoundRecipe;
