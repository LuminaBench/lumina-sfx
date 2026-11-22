import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/trim-scrub-branch.ts';
import source2 from './_recordings/field-cabbage-chop.ts';

export default {
  id: "cutting-a-pumpkin-stem",
  name: "Cutting a Pumpkin Stem",
  category: "Farming",
  tags: ["cutting", "pumpkin", "stem", "farm"],
  loopable: false,
  durationSec: 0.75,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .35, .72, 0, 11200],
      ['clip', source2, .14, .37, .68, 0, 9000],
      ["brush", "plant", .23, .35, .44, 990, .027],
    ]);
  },
} satisfies SoundRecipe;
