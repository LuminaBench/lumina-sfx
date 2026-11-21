import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "low-orbit-recovery-beacon-loses-power",
  name: "Low Orbit Recovery Beacon Loses Power",
  category: "Sci-Fi & UI",
  tags: ["low", "orbit", "recovery", "beacon", "loses", "power"],
  loopable: false,
  durationSec: 1.21,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["motor", 0, 0.78, 0.46, 335.92, 93.86, 0.035, 0.8],
      ["tone", 0.066, 0.57, 0.35, 644.67, 340.86, 0.043, 0.56],
      ["brush", "air", 0.127, 0.64, 0.26, 1349, 0.087],
      ["contact", "glass", 0.66, 0.38, 0.36, 380, 0.002],
      ["grains", "glass", 0.66, 0.37, 0.11, 1900, 7],
    ]);
  },
} satisfies SoundRecipe;
