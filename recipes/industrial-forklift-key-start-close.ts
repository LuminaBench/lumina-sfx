import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-loader-cab.ts';

export default {
  id: "industrial-forklift-key-start-close",
  name: "Industrial forklift key start close",
  category: "Vehicles & Engines",
  tags: ["industrial", "forklift", "key", "start", "close", "vehicle"],
  loopable: false,
  durationSec: 2.15,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.15, 1, .004, 7900, .002, .19],
    ]);
  },
} satisfies SoundRecipe;
