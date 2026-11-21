import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/dry-sand-footstep.ts';

export default {
  id: "sand-gust-across-tile",
  name: "Sand Gust across Tile",
  category: "Weather & Ambience",
  tags: ["sand", "gust", "across", "tile", "ambience"],
  loopable: false,
  durationSec: 1.14,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .57, .47, .069, 5600],
      ["brush", "air", .06, .95, .54, 1450, .081],
      ["grains", "stone", .22, .65, .30, 1970, 31],
    ]);
  },
} satisfies SoundRecipe;
