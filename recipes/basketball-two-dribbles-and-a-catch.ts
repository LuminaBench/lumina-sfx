import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-hoop.ts';

export default {
  id: "basketball-two-dribbles-and-a-catch",
  name: "Basketball Two Dribbles and a Catch",
  category: "Impacts",
  tags: ["basketball", "two", "dribbles", "catch"],
  loopable: false,
  durationSec: 1.21,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.46, 0.61, 0.04, 6800, 0.007, 0.08],
      ["contact", "rubber", 0.035, 0.23, 0.54, 146.08, 0.002],
      ['clip', source, 0.37, 0.76, 0.52, 0.19, 5304, 0.007, 0.08],
      ["contact", "rubber", 0.56, 0.27, 0.34, 202.4, 0.002],
      ["grains", "rubber", 0.61, 0.5, 0.19, 352, 12],
    ]);
  },
} satisfies SoundRecipe;
