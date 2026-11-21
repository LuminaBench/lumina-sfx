import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/action-lever-cycle.ts';
import source2 from './_recordings/field-diesel-idle.ts';

export default {
  id: "tractor-hydraulic-lift-raising",
  name: "Tractor Hydraulic Lift Raising",
  category: "Vehicles & Engines",
  tags: ["tractor", "hydraulic", "lift", "raising", "vehicle"],
  loopable: false,
  durationSec: 1.55,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .61, .67, .01, 8200],
      ['clip', source2, 0, 1.50, .26, .46, 1850, 0.008, .13],
      ["motor", .173, 1.26, .19, 144, 208, .15, .64],
      ["brush", "air", .22, 1.2, .27, 355, .12],
      ["contact", "iron", 1.27, .13, .15, 510, .002],
    ]);
  },
} satisfies SoundRecipe;
