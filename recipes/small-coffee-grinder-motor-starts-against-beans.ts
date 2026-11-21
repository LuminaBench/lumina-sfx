import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-ratchet.ts';

export default {
  id: "small-coffee-grinder-motor-starts-against-beans",
  name: "Small Coffee Grinder Motor Starts against Beans",
  category: "Props & Interactions",
  tags: ["small", "coffee", "grinder", "motor", "starts", "against", "beans"],
  loopable: false,
  durationSec: 0.82,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.7, 0.81, 0.014, 7200, 0.007, 0.08],
      ["brush", "stone", 0.07, 0.57, 0.25, 1088.64, 0.032],
      ["contact", "stone", 0.22, 0.23, 0.38, 648, 0.002],
    ]);
  },
} satisfies SoundRecipe;
