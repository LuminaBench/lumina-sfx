import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/jar-shatter-on-tile.ts';
import source2 from './_recordings/hardwood-footstep.ts';

export default {
  id: "roof-tile-breaking-over-planks",
  name: "Roof Tile Breaking over Planks",
  category: "Impacts",
  tags: ["roof", "tile", "breaking", "planks"],
  loopable: false,
  durationSec: 0.88,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .61, .67, .008, 8800],
      ['clip', source2, .069, .43, .51, .072, 5700],
      ["grains", "stone", .132, .62, .41, 1650, 17],
    ]);
  },
} satisfies SoundRecipe;
