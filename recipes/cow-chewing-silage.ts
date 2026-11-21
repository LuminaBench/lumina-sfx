import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-cow-chew.ts';
import source2 from './_recordings/field-cow-feeding.ts';

export default {
  id: "cow-chewing-silage",
  name: "Cow Chewing Silage",
  category: "Animals",
  tags: ["cow", "chewing", "silage", "livestock"],
  loopable: false,
  durationSec: 1.84,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.65, .89, .01, 8700],
      ['clip', source2, .34, .82, .35, 0, 6750],
    ]);
  },
} satisfies SoundRecipe;
