import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/barn-timber-creak.ts';

export default {
  id: "wind-rising-against-a-sash",
  name: "Wind Rising against a Sash",
  category: "Weather & Ambience",
  tags: ["wind", "rising", "against", "sash", "ambience"],
  loopable: false,
  durationSec: 1.71,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .83, .43, .036, 2800],
      ["brush", "air", .04, 1.60, .76, 440, .48],
      ["brush", "wood", .61, .61, .57, 260, .12],
    ]);
  },
} satisfies SoundRecipe;
