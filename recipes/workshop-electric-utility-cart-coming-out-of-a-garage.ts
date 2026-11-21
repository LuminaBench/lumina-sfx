import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-ev-surface.ts';

export default {
  id: "workshop-electric-utility-cart-coming-out-of-a-garage",
  name: "Workshop Electric Utility Cart Coming Out of a Garage",
  category: "Vehicles & Engines",
  tags: ["workshop", "electric", "utility", "cart", "coming", "garage", "vehicle"],
  loopable: false,
  durationSec: 4.39,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.55, 0.61, 0.11, 1802, 0.013, 0.56],
      ['clip', source, 1.05, 3.18, 0.73, 0.49, 5406, 0.57, 0.33],
      ["contact", "stone", 1.36, 0.41, 0.29, 322, 0.002],
    ]);
  },
} satisfies SoundRecipe;
