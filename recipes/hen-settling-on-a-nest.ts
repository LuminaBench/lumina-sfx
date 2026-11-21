import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-wings.ts';
import source2 from './_recordings/bundle-dry-stalks.ts';
import source3 from './_recordings/chicken-clucks.ts';

export default {
  id: "hen-settling-on-a-nest",
  name: "Hen Settling on a Nest",
  category: "Animals",
  tags: ["hen", "settling", "nest", "livestock"],
  loopable: false,
  durationSec: 1.28,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .71, .56, .07, 7400],
      ['clip', source2, .10, .72, .63, .015, 7150],
      ['clip', source3, .25, .56, .23, .12, 5400],
    ]);
  },
} satisfies SoundRecipe;
