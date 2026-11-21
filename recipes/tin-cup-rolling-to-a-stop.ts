import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-jar-contact.ts';

export default {
  id: "tin-cup-rolling-to-a-stop",
  name: "Tin Cup Rolling to a Stop",
  category: "Impacts",
  tags: ["tin", "cup", "rolling", "stop"],
  loopable: false,
  durationSec: 1.01,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .22, .51, .09, 10000],
      ["contact", "iron", .04, .23, .51, 480, .001],
      ["contact", "iron", .25, .23, .44, 490, .001],
      ["contact", "iron", .42, .17, .42, 560, .001],
      ["contact", "iron", .55, .16, .42, 690, .001],
      ["contact", "iron", .65, .19, .38, 660, .001],
    ]);
  },
} satisfies SoundRecipe;
