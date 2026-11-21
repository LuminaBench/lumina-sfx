import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "low-orbit-recovery-beacon-connects",
  name: "Low Orbit Recovery Beacon Connects",
  category: "Sci-Fi & UI",
  tags: ["low", "orbit", "recovery", "beacon", "connects"],
  loopable: false,
  durationSec: 0.92,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "glass", 0, 0.18, 0.59, 684, 0.002],
      ["brush", "air", 0.031, 0.42, 0.29, 1900, 0.081],
      ["motor", 0.07, 0.54, 0.33, 165.49, 251.94, 0.08, 0.63],
      ["tone", 0.272, 0.5, 0.44, 666.9, 763.23, 0.024, 0.25],
    ]);
  },
} satisfies SoundRecipe;
