import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "research-pod-instrument-door-connects",
  name: "Research Pod Instrument Door Connects",
  category: "Sci-Fi & UI",
  tags: ["research", "pod", "instrument", "door", "connects"],
  loopable: false,
  durationSec: 0.92,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, 0.18, 0.59, 457.2, 0.002],
      ["brush", "air", 0.031, 0.42, 0.29, 1270, 0.081],
      ["motor", 0.07, 0.54, 0.33, 75.04, 114.24, 0.08, 0.63],
      ["tone", 0.272, 0.5, 0.44, 290.7, 332.69, 0.024, 0.25],
    ]);
  },
} satisfies SoundRecipe;
