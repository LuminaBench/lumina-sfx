import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-hen-scratch.ts';
import source2 from './_recordings/bundle-dry-stalks.ts';

export default {
  id: "hen-scratching-straw",
  name: "Hen Scratching Straw",
  category: "Animals",
  tags: ["hen", "scratching", "straw", "livestock"],
  loopable: false,
  durationSec: 1.34,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.22, .88, .12, 9400],
      ['clip', source2, .28, .66, .34, .13, 6800],
    ]);
  },
} satisfies SoundRecipe;
