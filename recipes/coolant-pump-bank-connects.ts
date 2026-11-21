import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "coolant-pump-bank-connects",
  name: "Coolant Pump Bank Connects",
  category: "Sci-Fi & UI",
  tags: ["coolant", "pump", "bank", "connects"],
  loopable: false,
  durationSec: 0.92,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "air", 0, 0.18, 0.59, 345.6, 0.002],
      ["brush", "air", 0.031, 0.42, 0.29, 960, 0.081],
      ["motor", 0.07, 0.54, 0.33, 51.59, 78.54, 0.08, 0.63],
      ["tone", 0.272, 0.5, 0.44, 198.9, 227.63, 0.024, 0.25],
    ]);
  },
} satisfies SoundRecipe;
