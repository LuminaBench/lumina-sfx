import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/wet-crop-brush.ts';
import source2 from './_recordings/snap-green-stalk.ts';
import source3 from './_recordings/field-pepper-rip.ts';

export default {
  id: "snapping-a-pea-pod-from-the-vine",
  name: "Snapping a Pea Pod from the Vine",
  category: "Farming",
  tags: ["snapping", "pea", "pod", "vine", "farm"],
  loopable: false,
  durationSec: 0.43,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .19, .38, .105, 9400],
      ['clip', source2, .055, .22, .78, .006, 13500],
      ['clip', source3, .123, .23, .25, .025, 8200],
    ]);
  },
} satisfies SoundRecipe;
