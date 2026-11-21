import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-jar-turn.ts';
import source2 from './_recordings/physical-light-switch.ts';

export default {
  id: "fuel-cap-twist-and-click",
  name: "Fuel Cap Twist and Click",
  category: "Vehicles & Engines",
  tags: ["fuel", "cap", "twist", "click", "vehicle"],
  loopable: false,
  durationSec: 0.84,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .75, .72, .06, 6600],
      ['clip', source2, .45, .13, .55, 0, 8800],
      ["contact", "rubber", .52, .18, .27, 371, .003],
    ]);
  },
} satisfies SoundRecipe;
