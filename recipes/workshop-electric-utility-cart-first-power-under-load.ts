import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-ev-surface.ts';

export default {
  id: "workshop-electric-utility-cart-first-power-under-load",
  name: "Workshop Electric Utility Cart First Power under Load",
  category: "Vehicles & Engines",
  tags: ["workshop", "electric", "utility", "cart", "first", "power", "under", "load", "vehicle"],
  loopable: false,
  durationSec: 2.4,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.3, 0.82, 0.05, 4318, 0.007, 0.08],
      ["contact", "iron", 0.09, 0.25, 0.28, 572, 0.002],
      ["motor", 0.22, 1.91, 0.2, 143, 419, 0.21, 0.56],
    ]);
  },
} satisfies SoundRecipe;
