import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-paddlehit.ts';

export default {
  id: "table-tennis-paddle-compact-strike",
  name: "Table Tennis Paddle Compact Strike",
  category: "Impacts",
  tags: ["table", "tennis", "paddle", "compact", "strike"],
  loopable: false,
  durationSec: 0.72,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.65, 0.76, 0.03, 10900, 0.007, 0.08],
      ["contact", "wood", 0.014, 0.24, 0.57, 904, 0.002],
      ["grains", "wood", 0.064, 0.47, 0.15, 1663.36, 9],
    ]);
  },
} satisfies SoundRecipe;
