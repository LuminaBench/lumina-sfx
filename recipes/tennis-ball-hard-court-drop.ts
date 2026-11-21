import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-tennis.ts';

export default {
  id: "tennis-ball-hard-court-drop",
  name: "Tennis Ball Hard Court Drop",
  category: "Impacts",
  tags: ["tennis", "ball", "hard", "court", "drop"],
  loopable: false,
  durationSec: 0.72,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.65, 0.76, 0.03, 8900, 0.007, 0.08],
      ["contact", "rubber", 0.014, 0.24, 0.57, 301, 0.002],
      ["grains", "rubber", 0.064, 0.47, 0.15, 553.84, 9],
    ]);
  },
} satisfies SoundRecipe;
