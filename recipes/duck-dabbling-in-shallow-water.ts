import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/watering-can-dip.ts';
import source2 from './_recordings/water-drops-from-spout.ts';
import source3 from './_recordings/metal-pail-pour.ts';

export default {
  id: "duck-dabbling-in-shallow-water",
  name: "Duck Dabbling in Shallow Water",
  category: "Animals",
  tags: ["duck", "dabbling", "shallow", "water", "livestock"],
  loopable: false,
  durationSec: 1.48,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .95, .73, .20, 6300],
      ['clip', source2, .06, .86, .52, .03, 9500],
      ['clip', source3, .79, .55, .36, .49, 6700],
    ]);
  },
} satisfies SoundRecipe;
