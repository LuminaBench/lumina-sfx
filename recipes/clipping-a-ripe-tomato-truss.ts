import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/orchard-shears-snip.ts';
import source2 from './_recordings/wet-crop-brush.ts';

export default {
  id: "clipping-a-ripe-tomato-truss",
  name: "Clipping a Ripe Tomato Truss",
  category: "Farming",
  tags: ["clipping", "ripe", "tomato", "truss", "farm"],
  loopable: false,
  durationSec: 0.54,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .24, .79, .02, 12400],
      ['clip', source2, .09, .33, .55, .04, 9200],
      ["contact", "soil", .20, .13, .13, 685, .005],
    ]);
  },
} satisfies SoundRecipe;
