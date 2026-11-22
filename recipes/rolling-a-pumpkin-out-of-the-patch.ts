import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-garden-release.ts';
import source2 from './_recordings/apple-falls-in-orchard.ts';
import source3 from './_recordings/wet-crop-brush.ts';

export default {
  id: "rolling-a-pumpkin-out-of-the-patch",
  name: "Rolling a Pumpkin out of the Patch",
  category: "Farming",
  tags: ["rolling", "pumpkin", "patch", "farm"],
  loopable: false,
  durationSec: 1.13,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .38, .55, .025, 4800],
      ['clip', source2, .11, .44, .61, .078, 3950],
      ["brush", "soil", .22, .6, .46, 310, .053],
      ['clip', source3, .55, .49, .39, .04, 7670],
    ]);
  },
} satisfies SoundRecipe;
