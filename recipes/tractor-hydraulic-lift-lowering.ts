import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/action-lever-cycle.ts';
import source2 from './_recordings/field-heavy-hatch.ts';

export default {
  id: "tractor-hydraulic-lift-lowering",
  name: "Tractor Hydraulic Lift Lowering",
  category: "Vehicles & Engines",
  tags: ["tractor", "hydraulic", "lift", "lowering", "vehicle"],
  loopable: false,
  durationSec: 1.36,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, 1.17, .64, 945, .02],
      ['clip', source, .14, .41, .39, .17, 6200],
      ["motor", .058, .90, .11, 218, 107, .067, .31],
      ['clip', source2, .75, .45, .67, .51, 5300],
      ["contact", "rubber", .87, .30, .21, 117, .005],
    ]);
  },
} satisfies SoundRecipe;
