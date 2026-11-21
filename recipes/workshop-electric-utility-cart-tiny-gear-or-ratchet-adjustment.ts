import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-ratchet.ts';

export default {
  id: "workshop-electric-utility-cart-tiny-gear-or-ratchet-adjustment",
  name: "Workshop Electric Utility Cart Tiny Gear or Ratchet Adjustment",
  category: "Vehicles & Engines",
  tags: ["workshop", "electric", "utility", "cart", "tiny", "gear", "or", "ratchet", "adjustment", "vehicle"],
  loopable: false,
  durationSec: 0.76,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.6, 0.6, 0.045, 5032, 0.007, 0.08],
      ["grains", "iron", 0.035, 0.41, 0.25, 772.2, 6],
      ["contact", "rubber", 0.39, 0.22, 0.34, 350, 0.002],
    ]);
  },
} satisfies SoundRecipe;
