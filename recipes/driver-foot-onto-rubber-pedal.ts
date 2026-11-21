import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/hardwood-footstep.ts';
import source2 from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "driver-foot-onto-rubber-pedal",
  name: "Driver Foot onto Rubber Pedal",
  category: "Vehicles & Engines",
  tags: ["driver", "foot", "rubber", "pedal", "vehicle"],
  loopable: false,
  durationSec: 0.6,
  targetRmsDbfs: -30,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .45, .60, .068, 3000],
      ["contact", "rubber", .032, .31, .58, 197, .005],
      ['clip', source2, .09, .43, .27, .05, 4500],
    ]);
  },
} satisfies SoundRecipe;
