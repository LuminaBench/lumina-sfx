import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-smallwater.ts';

export default {
  id: "pool-practice-board-edge-slap-on-surface",
  name: "Pool Practice Board Edge Slap on Surface",
  category: "Impacts",
  tags: ["pool", "practice", "board", "edge", "slap", "surface"],
  loopable: false,
  durationSec: 0.72,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.65, 0.76, 0.03, 9300, 0.007, 0.08],
      ["contact", "water", 0.014, 0.24, 0.57, 626, 0.002],
      ["grains", "water", 0.064, 0.47, 0.15, 1151.84, 9],
    ]);
  },
} satisfies SoundRecipe;
