import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-smallwater.ts';

export default {
  id: "pool-practice-board-small-pool-landing",
  name: "Pool Practice Board Small Pool Landing",
  category: "Impacts",
  tags: ["pool", "practice", "board", "small", "landing"],
  loopable: false,
  durationSec: 1.21,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.46, 0.61, 0.04, 9300, 0.007, 0.08],
      ["contact", "water", 0.035, 0.23, 0.54, 519.58, 0.002],
      ['clip', source, 0.37, 0.76, 0.52, 0.19, 7254, 0.007, 0.08],
      ["contact", "water", 0.56, 0.27, 0.34, 719.9, 0.002],
      ["grains", "water", 0.61, 0.5, 0.19, 1252, 12],
    ]);
  },
} satisfies SoundRecipe;
