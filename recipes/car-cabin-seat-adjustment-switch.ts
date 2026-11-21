import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/physical-light-switch.ts';

export default {
  id: "car-cabin-seat-adjustment-switch",
  name: "Car Cabin Seat Adjustment Switch",
  category: "Vehicles & Engines",
  tags: ["car", "cabin", "seat", "adjustment", "switch", "vehicle"],
  loopable: false,
  durationSec: 0.81,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .14, .68, 0, 11800],
      ["motor", .054, .51, .36, 241, 189, .05, .53],
      ["contact", "rubber", .48, .22, .44, 430, .003],
    ]);
  },
} satisfies SoundRecipe;
