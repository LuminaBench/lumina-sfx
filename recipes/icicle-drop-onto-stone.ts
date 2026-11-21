import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/glass-wall-collapse.ts';

export default {
  id: "icicle-drop-onto-stone",
  name: "Icicle Drop onto Stone",
  category: "Weather & Ambience",
  tags: ["icicle", "drop", "stone", "ambience"],
  loopable: false,
  durationSec: 0.74,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .56, .56, .041, 13200],
      ["contact", "stone", .013, .29, .64, 680, .001],
      ["grains", "glass", .06, .49, .34, 1640, 11],
    ]);
  },
} satisfies SoundRecipe;
