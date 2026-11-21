import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-pong.ts';

export default {
  id: "table-tennis-ball-short-bounce-run",
  name: "Table Tennis Ball Short Bounce Run",
  category: "Impacts",
  tags: ["table", "tennis", "ball", "short", "bounce", "run"],
  loopable: false,
  durationSec: 1.21,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.46, 0.61, 0.04, 11200, 0.007, 0.08],
      ["contact", "wood", 0.035, 0.23, 0.54, 962.8, 0.002],
      ['clip', source, 0.37, 0.76, 0.52, 0.19, 8736, 0.007, 0.08],
      ["contact", "wood", 0.56, 0.27, 0.34, 1334, 0.002],
      ["grains", "wood", 0.61, 0.5, 0.19, 2320, 12],
    ]);
  },
} satisfies SoundRecipe;
