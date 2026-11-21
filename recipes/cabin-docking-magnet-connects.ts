import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "cabin-docking-magnet-connects",
  name: "Cabin Docking Magnet Connects",
  category: "Sci-Fi & UI",
  tags: ["cabin", "docking", "magnet", "connects"],
  loopable: false,
  durationSec: 0.92,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "rubber", 0, 0.18, 0.59, 468, 0.002],
      ["brush", "air", 0.031, 0.42, 0.29, 1300, 0.081],
      ["motor", 0.07, 0.54, 0.33, 79.06, 120.36, 0.08, 0.63],
      ["tone", 0.272, 0.5, 0.44, 404.1, 462.47, 0.024, 0.25],
    ]);
  },
} satisfies SoundRecipe;
