import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-wings.ts';
import source2 from './_recordings/bundle-dry-stalks.ts';
import source3 from './_recordings/turkey-gobble.ts';

export default {
  id: "turkey-wing-rustle",
  name: "Turkey Wing Rustle",
  category: "Animals",
  tags: ["turkey", "wing", "rustle", "livestock"],
  loopable: false,
  durationSec: 1.07,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .75, .85, .085, 10000],
      ['clip', source2, .13, .64, .43, .065, 11300],
      ['clip', source3, .40, .35, .17, .14, 5500],
    ]);
  },
} satisfies SoundRecipe;
