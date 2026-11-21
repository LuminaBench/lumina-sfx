import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-wings.ts';
import source2 from './_recordings/watering-can-rose.ts';

export default {
  id: "duck-flapping-after-a-bath",
  name: "Duck Flapping after a Bath",
  category: "Animals",
  tags: ["duck", "flapping", "bath", "livestock"],
  loopable: false,
  durationSec: 1.14,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .88, .93, .02, 11300],
      ['clip', source2, .045, .79, .54, .61, 11700],
      ["grains", "water", .08, .63, .18, 915, 19],
    ]);
  },
} satisfies SoundRecipe;
