import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-ratchet.ts';

export default {
  id: "small-coffee-grinder-final-burr-wind-down",
  name: "Small Coffee Grinder Final Burr Wind-down",
  category: "Props & Interactions",
  tags: ["small", "coffee", "grinder", "final", "burr", "wind", "down"],
  loopable: false,
  durationSec: 1.57,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.6, 0.65, 0.22, 5256, 0.007, 0.08],
      ["contact", "stone", 0.067, 0.29, 0.44, 505.44, 0.002],
      ["grains", "stone", 0.107, 0.51, 0.22, 1296, 8],
      ["contact", "wood", 0.525, 0.3, 0.39, 427.68, 0.002],
    ]);
  },
} satisfies SoundRecipe;
