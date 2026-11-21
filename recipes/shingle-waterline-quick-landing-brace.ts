import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/shallow-water-footstep.ts';

export default {
  id: "shingle-waterline-quick-landing-brace",
  name: "Shingle Waterline Quick Landing Brace",
  category: "Footsteps & UI",
  tags: ["shingle", "waterline", "quick", "landing", "brace"],
  loopable: false,
  durationSec: 1.1,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.47, 0.72, 0.067, 7600, 0.007, 0.08],
      ["contact", "water", 0.036, 0.35, 0.73, 325.54, 0.002],
      ['clip', source, 0.3, 0.67, 0.47, 0.051, 6232, 0.007, 0.08],
      ["grains", "water", 0.48, 0.48, 0.18, 1032.2, 14],
    ]);
  },
} satisfies SoundRecipe;
