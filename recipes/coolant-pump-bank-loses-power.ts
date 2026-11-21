import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "coolant-pump-bank-loses-power",
  name: "Coolant Pump Bank Loses Power",
  category: "Sci-Fi & UI",
  tags: ["coolant", "pump", "bank", "loses", "power"],
  loopable: false,
  durationSec: 1.21,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["motor", 0, 0.78, 0.46, 104.72, 29.26, 0.035, 0.8],
      ["tone", 0.066, 0.57, 0.35, 192.27, 101.66, 0.043, 0.56],
      ["brush", "air", 0.127, 0.64, 0.26, 681.6, 0.087],
      ["contact", "air", 0.66, 0.38, 0.36, 192, 0.002],
      ["grains", "air", 0.66, 0.37, 0.11, 960, 7],
    ]);
  },
} satisfies SoundRecipe;
