import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/drop-root-crops-crate.ts';
import source2 from './_recordings/slatted-crate-settle.ts';

export default {
  id: "sorting-small-potatoes-on-a-bench",
  name: "Sorting Small Potatoes on a Bench",
  category: "Farming",
  tags: ["sorting", "small", "potatoes", "bench", "farm", "wakefall"],
  loopable: false,
  durationSec: 0.79,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .36, .63, .012, 4000],
      ['clip', source2, .145, .28, .54, 0, 6700],
      ['clip', source, .39, .34, .55, .19, 5500],
    ]);
  },
} satisfies SoundRecipe;
