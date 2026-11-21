import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/ceramic-mug-set-down.ts';
import source2 from './_recordings/jar-shatter-on-tile.ts';

export default {
  id: "ceramic-pot-cracked-under-pressure",
  name: "Ceramic Pot Cracked under Pressure",
  category: "Impacts",
  tags: ["ceramic", "pot", "cracked", "under", "pressure"],
  loopable: false,
  durationSec: 0.76,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .24, .51, .04, 8700],
      ["grains", "glass", .05, .27, .25, 1890, 7],
      ['clip', source2, .28, .41, .75, .038, 10500],
    ]);
  },
} satisfies SoundRecipe;
