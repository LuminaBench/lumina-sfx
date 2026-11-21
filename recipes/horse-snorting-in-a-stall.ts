import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-horse-breath.ts';

export default {
  id: "horse-snorting-in-a-stall",
  name: "Horse Snorting in a Stall",
  category: "Animals",
  tags: ["horse", "snorting", "stall", "livestock"],
  loopable: false,
  durationSec: 1.02,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .71, .91, 0, 10600],
      ['clip', source, .043, .70, .17, .014, 3420],
    ]);
  },
} satisfies SoundRecipe;
