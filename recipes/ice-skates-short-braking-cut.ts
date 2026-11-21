import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-blade.ts';

export default {
  id: "ice-skates-short-braking-cut",
  name: "Ice Skates Short Braking Cut",
  category: "Impacts",
  tags: ["ice", "skates", "short", "braking", "cut"],
  loopable: false,
  durationSec: 1.21,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.46, 0.61, 0.04, 9200, 0.007, 0.08],
      ["contact", "stone", 0.035, 0.23, 0.54, 571.04, 0.002],
      ['clip', source, 0.37, 0.76, 0.52, 0.19, 7176, 0.007, 0.08],
      ["contact", "stone", 0.56, 0.27, 0.34, 791.2, 0.002],
      ["grains", "stone", 0.61, 0.5, 0.19, 1376, 12],
    ]);
  },
} satisfies SoundRecipe;
