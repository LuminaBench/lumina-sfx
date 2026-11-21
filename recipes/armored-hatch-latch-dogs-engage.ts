import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-heavy-hatch.ts';
import source2 from './_recordings/motion-clank-close.ts';

export default {
  id: "armored-hatch-latch-dogs-engage",
  name: "Armored hatch latch dogs engage",
  category: "Vehicles & Engines",
  tags: ["armored", "hatch", "latch", "dogs", "engage", "tank", "tracked", "armoured", "vehicle"],
  loopable: false,
  durationSec: 0.88,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .82, .54, .02, 5100, .004, .12],
      ['clip', source2, .46, .295, .64, .012, 7600, .003, .04],
      ["contact", "iron", 0, .095, .63, 340, .0012],
      ["contact", "iron", .218, .092, .31, 823, .001],
      ["contact", "iron", .492, .14, .47, 585, .001],
    ]);
  },
} satisfies SoundRecipe;
