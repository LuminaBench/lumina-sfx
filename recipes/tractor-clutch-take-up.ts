import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-diesel-idle.ts';
import source2 from './_recordings/tractor-diesel-pullaway.ts';
import source3 from './_recordings/action-lever-cycle.ts';

export default {
  id: "tractor-clutch-take-up",
  name: "Tractor Clutch Take-up",
  category: "Vehicles & Engines",
  tags: ["tractor", "clutch", "take", "up", "vehicle"],
  loopable: false,
  durationSec: 1.41,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.33, .46, .92, 1900, 0.005, .13],
      ['clip', source2, .235, 1.03, .59, .03, 4300],
      ['clip', source3, .073, .32, .22, .055, 6700],
      ["contact", "rubber", .23, .31, .36, 125, .005],
    ]);
  },
} satisfies SoundRecipe;
