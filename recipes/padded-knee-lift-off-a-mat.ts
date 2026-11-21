import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/jacket-movement-rustle.ts';
import source2 from './_recordings/leather-strap-flex.ts';

export default {
  id: "padded-knee-lift-off-a-mat",
  name: "Padded Knee Lift off a Mat",
  category: "Footsteps & UI",
  tags: ["padded", "knee", "lift", "mat"],
  loopable: false,
  durationSec: 0.61,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .51, .71, .107, 6200],
      ["brush", "rubber", .046, .50, .47, 454, .042],
      ['clip', source2, .16, .40, .39, .13, 5500],
    ]);
  },
} satisfies SoundRecipe;
