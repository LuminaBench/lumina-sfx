import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-glass-lid.ts';

export default {
  id: "porcelain-lid-skitter",
  name: "Porcelain Lid Skitter",
  category: "Impacts",
  tags: ["porcelain", "lid", "skitter"],
  loopable: false,
  durationSec: 0.89,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .38, .78, 0, 12300],
      ["contact", "glass", .061, .19, .45, 1160, .001],
      ["contact", "glass", .24, .14, .36, 1270, .0012],
      ["contact", "glass", .387, .16, .33, 1420, .001],
      ["contact", "glass", .495, .19, .29, 1260, .001],
    ]);
  },
} satisfies SoundRecipe;
