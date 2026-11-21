import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-metal-pressure.ts';
import source2 from './_recordings/car-crash-metal-glass.ts';
import source3 from './_recordings/motion-chain-link.ts';

export default {
  id: "truck-metal-collision",
  name: "Truck metal collision",
  category: "Vehicles & Engines",
  tags: ["truck", "collision", "vehicle"],
  loopable: false,
  durationSec: 2.39,
  targetRmsDbfs: -22,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.42, .69, .004, 7250, .002, .27],
      ['clip', source2, .018, 2.21, .59, .018, 8700, .022, .31],
      ["contact", "iron", 0, .38, .77, 164, .0014],
      ['clip', source3, .39, 1.96, .26, .12, 5430, .10, .20],
      ["grains", "iron", .30, 1.65, .49, 1230, 16],
    ]);
  },
} satisfies SoundRecipe;
