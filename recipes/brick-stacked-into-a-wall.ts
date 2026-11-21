import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/rock-pile-impact.ts';
import source2 from './_recordings/wood-platform-landing.ts';

export default {
  id: "brick-stacked-into-a-wall",
  name: "Brick Stacked into a Wall",
  category: "Impacts",
  tags: ["brick", "stacked", "wall"],
  loopable: false,
  durationSec: 0.74,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .37, .76, .023, 7600],
      ["brush", "stone", .06, .42, .55, 1360, .043],
      ['clip', source2, .24, .34, .33, .058, 3800],
    ]);
  },
} satisfies SoundRecipe;
