import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/steel-drawer-shut.ts';
import source2 from './_recordings/car-door-shut-inside.ts';

export default {
  id: "van-sliding-door-closing-from-inside",
  name: "Van Sliding Door Closing from Inside",
  category: "Vehicles & Engines",
  tags: ["van", "sliding", "door", "closing", "inside", "vehicle"],
  loopable: false,
  durationSec: 1.19,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .71, .59, .013, 5900],
      ['clip', source2, .42, .57, .80, .022, 7200],
      ["brush", "rubber", .28, .51, .22, 264, .041],
    ]);
  },
} satisfies SoundRecipe;
