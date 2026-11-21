import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/packed-snow-footstep.ts';

export default {
  id: "snow-sliding-off-a-roof",
  name: "Snow Sliding off a Roof",
  category: "Weather & Ambience",
  tags: ["snow", "sliding", "roof", "ambience"],
  loopable: false,
  durationSec: 2.3,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .41, .47, .017, 4900],
      ["brush", "soil", .12, 1.54, .69, 510, .19],
      ["brush", "cloth", .41, 1.45, .58, 395, .28],
      ['clip', source, 1.34, .39, .48, .041, 3200],
      ["grains", "soil", 1.31, .73, .32, 510, 21],
    ]);
  },
} satisfies SoundRecipe;
