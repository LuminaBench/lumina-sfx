import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-bike.ts';

export default {
  id: "sailplane-wheel-skimming-hard-ground",
  name: "Sailplane Wheel Skimming Hard Ground",
  category: "Aircraft",
  tags: ["sailplane", "wheel", "skimming", "hard", "ground"],
  loopable: false,
  durationSec: 2.45,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "rubber", 0, 0.24, 0.51, 198, 0.002],
      ["contact", "stone", 0.18, 0.37, 0.55, 263, 0.002],
      ['clip', source, 0.25, 1.88, 0.37, 0.62, 3780, 0.15, 0.37],
      ["grains", "stone", 0.31, 1.61, 0.38, 685, 27],
    ]);
  },
} satisfies SoundRecipe;
