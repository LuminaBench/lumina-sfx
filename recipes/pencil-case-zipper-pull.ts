import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/backpack-zip-close.ts';
import source2 from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "pencil-case-zipper-pull",
  name: "Pencil Case Zipper Pull",
  category: "Props & Interactions",
  tags: ["pencil", "case", "zipper", "pull"],
  loopable: false,
  durationSec: 0.83,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .66, .81, .057, 8900],
      ['clip', source2, .28, .49, .32, .07, 5800],
    ]);
  },
} satisfies SoundRecipe;
