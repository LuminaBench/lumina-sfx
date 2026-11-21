import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-tennis.ts';

export default {
  id: "tennis-ball-two-bounces-and-a-roll",
  name: "Tennis Ball Two Bounces and a Roll",
  category: "Impacts",
  tags: ["tennis", "ball", "two", "bounces", "roll"],
  loopable: false,
  durationSec: 1.21,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.46, 0.61, 0.04, 8900, 0.007, 0.08],
      ["contact", "rubber", 0.035, 0.23, 0.54, 249.83, 0.002],
      ['clip', source, 0.37, 0.76, 0.52, 0.19, 6942, 0.007, 0.08],
      ["contact", "rubber", 0.56, 0.27, 0.34, 346.15, 0.002],
      ["grains", "rubber", 0.61, 0.5, 0.19, 602, 12],
    ]);
  },
} satisfies SoundRecipe;
