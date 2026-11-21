import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "tactile-suit-wrist-module-connects",
  name: "Tactile Suit Wrist Module Connects",
  category: "Sci-Fi & UI",
  tags: ["tactile", "suit", "wrist", "module", "connects"],
  loopable: false,
  durationSec: 0.92,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "rubber", 0, 0.18, 0.59, 925.2, 0.002],
      ["brush", "air", 0.031, 0.42, 0.29, 2570, 0.081],
      ["motor", 0.07, 0.54, 0.33, 186.93, 284.58, 0.08, 0.63],
      ["tone", 0.272, 0.5, 0.44, 749.7, 857.99, 0.024, 0.25],
    ]);
  },
} satisfies SoundRecipe;
