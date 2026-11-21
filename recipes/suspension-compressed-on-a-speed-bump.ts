import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/car-bumper-bump.ts';
import source2 from './_recordings/barn-timber-creak.ts';

export default {
  id: "suspension-compressed-on-a-speed-bump",
  name: "Suspension Compressed on a Speed Bump",
  category: "Vehicles & Engines",
  tags: ["suspension", "compressed", "speed", "bump", "vehicle"],
  loopable: false,
  durationSec: 1.23,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .62, .50, .035, 3150],
      ["contact", "rubber", .05, .38, .77, 103, .010],
      ['clip', source2, .16, .64, .40, .28, 4370],
      ["contact", "rubber", .55, .48, .56, 122, .005],
    ]);
  },
} satisfies SoundRecipe;
