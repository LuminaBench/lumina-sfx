import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "deep-habitat-air-mixer-loses-power",
  name: "Deep Habitat Air Mixer Loses Power",
  category: "Sci-Fi & UI",
  tags: ["deep", "habitat", "air", "mixer", "loses", "power"],
  loopable: false,
  durationSec: 1.21,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["motor", 0, 0.78, 0.46, 127.84, 35.72, 0.035, 0.8],
      ["tone", 0.066, 0.57, 0.35, 245.34, 129.72, 0.043, 0.56],
      ["brush", "air", 0.127, 0.64, 0.26, 1100.5, 0.087],
      ["contact", "air", 0.66, 0.38, 0.36, 310, 0.002],
      ["grains", "air", 0.66, 0.37, 0.11, 1550, 7],
    ]);
  },
} satisfies SoundRecipe;
