import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/car-keyed-ignition.ts';

export default {
  id: "dashboard-ignition-accessory-click",
  name: "Dashboard Ignition Accessory Click",
  category: "Vehicles & Engines",
  tags: ["dashboard", "ignition", "accessory", "click", "vehicle"],
  loopable: false,
  durationSec: 0.57,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .45, .74, .032, 3700],
      ["contact", "rubber", .16, .23, .51, 318, .004],
    ]);
  },
} satisfies SoundRecipe;
