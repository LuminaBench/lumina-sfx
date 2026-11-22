import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/jacket-movement-rustle.ts';
import source2 from './_recordings/wet-crop-brush.ts';
import source3 from './_recordings/field-leaf-tear.ts';

export default {
  id: "lifting-a-row-cover",
  name: "Lifting a Row Cover",
  category: "Farming",
  tags: ["lifting", "row", "cover", "farm"],
  loopable: false,
  durationSec: 0.97,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .75, .72, .012, 9800],
      ['clip', source2, .10, .55, .35, .088, 5700],
      ['clip', source3, .25, .39, .32, .081, 8700],
    ]);
  },
} satisfies SoundRecipe;
