import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "capacitor-bleed-valve-open",
  name: "Capacitor Bleed Valve Open",
  category: "Sci-Fi & UI",
  tags: ["capacitor", "bleed", "valve", "open"],
  loopable: false,
  durationSec: 0.83,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, .169, .58, 917, .0006],
      ["grains", "iron", .056, .33, .42, 3100, 10],
      ["tone", .065, .61, .49, 868, 121, .026, .62],
      ["brush", "air", .12, .45, .42, 1000, .048],
    ]);
  },
} satisfies SoundRecipe;
