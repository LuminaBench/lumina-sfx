import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-butter-knife.ts';
import source2 from './_recordings/metal-pail-pour.ts';
import source3 from './_recordings/hand-pump-strokes.ts';

export default {
  id: "wooden-butter-churn-strokes",
  name: "Wooden Butter Churn Strokes",
  category: "Props & Interactions",
  tags: ["wooden", "butter", "churn", "strokes"],
  loopable: false,
  durationSec: 1.85,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .65, .40, .01, 6300],
      ['clip', source2, .035, 1.42, .64, .04, 3900],
      ['clip', source3, .26, 1.16, .37, .07, 4200],
      ["contact", "wood", 1.32, .22, .38, 210, .004],
    ]);
  },
} satisfies SoundRecipe;
