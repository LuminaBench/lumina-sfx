import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/loose-gravel-landing.ts';
import source2 from './_recordings/car-tire-skid-launch.ts';
import source3 from './_recordings/mixed-rubble-footstep.ts';

export default {
  id: "rear-tire-spinning-on-loose-gravel",
  name: "Rear Tire Spinning on Loose Gravel",
  category: "Vehicles & Engines",
  tags: ["rear", "tire", "spinning", "loose", "gravel", "vehicle"],
  loopable: false,
  durationSec: 1.48,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .54, .60, .015, 7200],
      ["grains", "stone", .07, .98, .58, 1630, 49],
      ['clip', source2, .12, 1.20, .54, .20, 9200, .027, .11],
      ['clip', source3, .59, .63, .28, .055, 7100],
    ]);
  },
} satisfies SoundRecipe;
