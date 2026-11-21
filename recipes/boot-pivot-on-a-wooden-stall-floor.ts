import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/hardwood-footstep.ts';
import source2 from './_recordings/sneaker-pivot-squeak.ts';

export default {
  id: "boot-pivot-on-a-wooden-stall-floor",
  name: "Boot Pivot on a Wooden Stall Floor",
  category: "Footsteps & UI",
  tags: ["boot", "pivot", "wooden", "stall", "floor"],
  loopable: false,
  durationSec: 0.8,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .52, .77, .03, 6100],
      ['clip', source2, .06, .56, .49, .026, 5200],
      ["brush", "wood", .13, .53, .34, 377, .012],
    ]);
  },
} satisfies SoundRecipe;
