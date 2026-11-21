import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sport-v8.ts';

export default {
  id: "supercharged-coupe-cabin-load-rise",
  name: "Supercharged coupe cabin load rise",
  category: "Vehicles & Engines",
  tags: ["supercharged", "coupe", "cabin", "load", "rise", "car", "engine", "vehicle"],
  loopable: false,
  durationSec: 2.4,
  targetRmsDbfs: -24.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.38, .79, .20, 980, .014, .22],
      ["motor", 0, 2.34, .17, 192, 573, .038, .38],
      ["brush", "rubber", .13, 2.21, .18, 405, .03],
    ]);
  },
} satisfies SoundRecipe;
