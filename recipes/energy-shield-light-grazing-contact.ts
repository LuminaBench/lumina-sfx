import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "energy-shield-light-grazing-contact",
  name: "Energy shield light grazing contact",
  category: "Weapons",
  tags: ["energy", "shield", "light", "grazing", "contact"],
  loopable: false,
  durationSec: 0.57,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "glass", 0, .078, .56, 1260, .00065],
      ["tone", 0, .26, .34, 3180, 1420, .0019, .46],
      ["brush", "air", .017, .47, .41, 3280, .007],
    ]);
  },
} satisfies SoundRecipe;
