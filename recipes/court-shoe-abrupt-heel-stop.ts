import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/sneaker-pivot-squeak.ts';

export default {
  id: "court-shoe-abrupt-heel-stop",
  name: "Court Shoe Abrupt Heel Stop",
  category: "Impacts",
  tags: ["court", "shoe", "abrupt", "heel", "stop"],
  loopable: false,
  durationSec: 1.21,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.46, 0.61, 0.04, 7280, 0.007, 0.08],
      ["contact", "rubber", 0.035, 0.23, 0.54, 473.1, 0.002],
      ['clip', source, 0.37, 0.76, 0.52, 0.19, 5678.4, 0.007, 0.08],
      ["contact", "rubber", 0.56, 0.27, 0.34, 655.5, 0.002],
      ["grains", "rubber", 0.61, 0.5, 0.19, 1140, 12],
    ]);
  },
} satisfies SoundRecipe;
