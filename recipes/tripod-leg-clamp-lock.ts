import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/action-lever-cycle.ts';

export default {
  id: "tripod-leg-clamp-lock",
  name: "Tripod Leg Clamp Lock",
  category: "Props & Interactions",
  tags: ["tripod", "leg", "clamp", "lock"],
  loopable: false,
  durationSec: 0.85,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .69, .66, .043, 9400],
      ["contact", "iron", .32, .35, .36, 813, .001],
      ["contact", "rubber", .535, .22, .24, 368, .002],
    ]);
  },
} satisfies SoundRecipe;
