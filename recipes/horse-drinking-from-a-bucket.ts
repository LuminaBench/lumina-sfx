import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-horse-breath.ts';
import source2 from './_recordings/metal-pail-pour.ts';
import source3 from './_recordings/water-drops-from-spout.ts';

export default {
  id: "horse-drinking-from-a-bucket",
  name: "Horse Drinking from a Bucket",
  category: "Animals",
  tags: ["horse", "drinking", "bucket", "livestock"],
  loopable: false,
  durationSec: 1.78,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .55, .46, .023, 7200],
      ['clip', source2, .073, 1.45, .70, .086, 6100],
      ['clip', source3, .93, .64, .38, .12, 9300],
    ]);
  },
} satisfies SoundRecipe;
