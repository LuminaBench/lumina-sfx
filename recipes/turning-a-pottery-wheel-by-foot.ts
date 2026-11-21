import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-pottery-wheel.ts';
import source2 from './_recordings/hardwood-footstep.ts';

export default {
  id: "turning-a-pottery-wheel-by-foot",
  name: "Turning a Pottery Wheel by Foot",
  category: "Props & Interactions",
  tags: ["turning", "pottery", "wheel", "foot"],
  loopable: false,
  durationSec: 1.97,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.86, .66, 0, 3570],
      ['clip', source2, .04, .31, .47, .022, 4500],
      ['clip', source2, .76, .40, .35, 0, 3560],
      ["contact", "wood", .84, .26, .27, 245, .0014],
    ]);
  },
} satisfies SoundRecipe;
