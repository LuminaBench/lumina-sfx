import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-turbo-pass.ts';

export default {
  id: "turbo-blow-off-curbside-pass",
  name: "Turbo blow-off curbside pass",
  category: "Vehicles & Engines",
  tags: ["turbo", "blow", "curbside", "pass", "car", "engine", "vehicle"],
  loopable: false,
  durationSec: 1.58,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.58, 1, .02, 9000, .002, .14],
      ["brush", "air", 0, .19, .07, 1550, .006],
    ]);
  },
} satisfies SoundRecipe;
