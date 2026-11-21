import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/action-lever-cycle.ts';

export default {
  id: "station-gate-revolves-once",
  name: "Station Gate Revolves Once",
  category: "Vehicles & Engines",
  tags: ["station", "gate", "revolves", "once", "vehicle"],
  loopable: false,
  durationSec: 1.43,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.67, 0.67, 0.017, 6080, 0.007, 0.08],
      ["contact", "iron", 0.3, 0.25, 0.55, 532, 0.002],
      ["contact", "wood", 0.58, 0.43, 0.39, 310, 0.002],
      ["contact", "rubber", 0.95, 0.31, 0.43, 245, 0.002],
    ]);
  },
} satisfies SoundRecipe;
