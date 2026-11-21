import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/ceramic-mug-set-down.ts';
import source2 from './_recordings/press-potting-soil.ts';

export default {
  id: "clay-pot-set-into-wet-soil",
  name: "Clay Pot Set into Wet Soil",
  category: "Impacts",
  tags: ["clay", "pot", "set", "wet", "soil"],
  loopable: false,
  durationSec: 0.62,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .43, .78, .02, 6700],
      ['clip', source2, .045, .36, .58, .01, 6500],
      ["brush", "soil", .23, .26, .21, 610, .039],
    ]);
  },
} satisfies SoundRecipe;
