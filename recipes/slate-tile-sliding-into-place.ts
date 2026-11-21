import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/shovel-dry-earth.ts';
import source2 from './_recordings/field-glass-lid.ts';

export default {
  id: "slate-tile-sliding-into-place",
  name: "Slate Tile Sliding into Place",
  category: "Impacts",
  tags: ["slate", "tile", "sliding", "place"],
  loopable: false,
  durationSec: 0.83,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .54, .65, .035, 6580],
      ["brush", "stone", .17, .61, .53, 1840, .056],
      ['clip', source2, .47, .24, .36, .085, 8900],
    ]);
  },
} satisfies SoundRecipe;
