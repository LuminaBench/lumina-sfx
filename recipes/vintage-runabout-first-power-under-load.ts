import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-ignition.ts';

export default {
  id: "vintage-runabout-first-power-under-load",
  name: "Vintage Runabout First Power under Load",
  category: "Vehicles & Engines",
  tags: ["vintage", "runabout", "first", "power", "under", "load", "vehicle"],
  loopable: false,
  durationSec: 2.4,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.3, 0.82, 0.05, 3556, 0.007, 0.08],
      ["contact", "iron", 0.09, 0.25, 0.28, 260, 0.002],
      ["motor", 0.22, 1.91, 0.2, 65, 135, 0.21, 0.56],
    ]);
  },
} satisfies SoundRecipe;
