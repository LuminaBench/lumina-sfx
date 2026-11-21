import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-blade.ts';

export default {
  id: "ice-skates-first-push",
  name: "Ice Skates First Push",
  category: "Impacts",
  tags: ["ice", "skates", "first", "push"],
  loopable: false,
  durationSec: 0.72,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.65, 0.76, 0.03, 9200, 0.007, 0.08],
      ["contact", "stone", 0.014, 0.24, 0.57, 688, 0.002],
      ["grains", "stone", 0.064, 0.47, 0.15, 1265.92, 9],
    ]);
  },
} satisfies SoundRecipe;
