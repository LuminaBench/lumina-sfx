import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "prism-repeater-clear-energy-discharge",
  name: "Prism repeater clear energy discharge",
  category: "Weapons",
  tags: ["prism", "repeater", "clear", "energy", "discharge"],
  loopable: false,
  durationSec: 0.97,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, .073, .51, 631, .00068],
      ["tone", 0, .39, .61, 176, 488, .0022, .81],
      ["tone", .016, .72, .36, 1880, 350, .0035, .53],
      ["brush", "air", .050, .80, .42, 1735, .019],
    ]);
  },
} satisfies SoundRecipe;
