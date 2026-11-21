import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "research-pod-instrument-door-loses-power",
  name: "Research Pod Instrument Door Loses Power",
  category: "Sci-Fi & UI",
  tags: ["research", "pod", "instrument", "door", "loses", "power"],
  loopable: false,
  durationSec: 1.21,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["motor", 0, 0.78, 0.46, 152.32, 42.56, 0.035, 0.8],
      ["tone", 0.066, 0.57, 0.35, 281.01, 148.58, 0.043, 0.56],
      ["brush", "air", 0.127, 0.64, 0.26, 901.7, 0.087],
      ["contact", "iron", 0.66, 0.38, 0.36, 254, 0.002],
      ["grains", "iron", 0.66, 0.37, 0.11, 1270, 7],
    ]);
  },
} satisfies SoundRecipe;
