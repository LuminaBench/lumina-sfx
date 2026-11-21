import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/slice-harvest-carrot.ts';
import source2 from './_recordings/field-cow-chew.ts';
import source3 from './_recordings/field-horse-breath.ts';

export default {
  id: "horse-chewing-a-carrot",
  name: "Horse Chewing a Carrot",
  category: "Animals",
  tags: ["horse", "chewing", "carrot", "livestock"],
  loopable: false,
  durationSec: 1.58,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .25, .75, .01, 9190],
      ['clip', source2, .095, 1.36, .66, .13, 7550],
      ['clip', source3, .90, .52, .21, .052, 7200],
    ]);
  },
} satisfies SoundRecipe;
