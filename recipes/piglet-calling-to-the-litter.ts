import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-pig-young.ts';
import source2 from './_recordings/field-pig-snuffle.ts';

export default {
  id: "piglet-calling-to-the-litter",
  name: "Piglet Calling to the Litter",
  category: "Animals",
  tags: ["piglet", "calling", "litter", "livestock"],
  loopable: false,
  durationSec: 1.56,
  targetRmsDbfs: -22,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.32, .90, 0, 9800],
      ['clip', source2, .89, .55, .32, .12, 4500],
    ]);
  },
} satisfies SoundRecipe;
