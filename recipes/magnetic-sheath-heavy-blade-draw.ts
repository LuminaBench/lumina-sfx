import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-blade.ts';

export default {
  id: "magnetic-sheath-heavy-blade-draw",
  name: "Magnetic sheath heavy blade draw",
  category: "Weapons",
  tags: ["magnetic", "sheath", "heavy", "blade", "draw"],
  loopable: false,
  durationSec: 1.11,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .98, .71, .03, 7500, .004, .15],
      ["contact", "iron", 0, .1, .61, 298, .0011],
      ["brush", "iron", .04, .83, .34, 1320, .015],
      ["tone", .10, .85, .075, 510, 283, .014, .43],
    ]);
  },
} satisfies SoundRecipe;
