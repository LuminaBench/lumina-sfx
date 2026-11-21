import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-ev-surface.ts';

export default {
  id: "workshop-electric-utility-cart-brake-and-settle",
  name: "Workshop Electric Utility Cart Brake and Settle",
  category: "Vehicles & Engines",
  tags: ["workshop", "electric", "utility", "cart", "brake", "settle", "vehicle"],
  loopable: false,
  durationSec: 1.87,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.67, 0.6, 0.72, 3400, 0.018, 0.51],
      ["brush", "stone", 0.14, 1.43, 0.53, 830, 0.11],
      ["contact", "rubber", 0.99, 0.38, 0.47, 177, 0.002],
      ["contact", "iron", 1.21, 0.29, 0.31, 245, 0.002],
    ]);
  },
} satisfies SoundRecipe;
