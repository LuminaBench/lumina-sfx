import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-milk-pour.ts';
import source2 from './_recordings/field-butter-knife.ts';

export default {
  id: "stirring-a-thick-stew",
  name: "Stirring a Thick Stew",
  category: "Props & Interactions",
  tags: ["stirring", "thick", "stew"],
  loopable: false,
  durationSec: 1.5,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.18, .67, .021, 3700],
      ['clip', source2, .19, .84, .58, .04, 6100],
      ["contact", "wood", .39, .16, .31, 400, .001],
      ["contact", "wood", .88, .18, .29, 337, .001],
    ]);
  },
} satisfies SoundRecipe;
