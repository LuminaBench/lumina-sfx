import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-pong.ts';

export default {
  id: "table-tennis-ball-table-bounce",
  name: "Table Tennis Ball Table Bounce",
  category: "Impacts",
  tags: ["table", "tennis", "ball", "bounce"],
  loopable: false,
  durationSec: 0.72,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.65, 0.76, 0.03, 11200, 0.007, 0.08],
      ["contact", "wood", 0.014, 0.24, 0.57, 1160, 0.002],
      ["grains", "wood", 0.064, 0.47, 0.15, 2134.4, 9],
    ]);
  },
} satisfies SoundRecipe;
