import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "energy-shield-overload-collapse",
  name: "Energy shield overload collapse",
  category: "Weapons",
  tags: ["energy", "shield", "overload", "collapse"],
  loopable: false,
  durationSec: 1.67,
  targetRmsDbfs: -22.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "glass", 0, .118, .72, 1100, .00061],
      ["tone", 0, .55, .52, 615, 1580, .012, .86],
      ["contact", "glass", .44, .141, .77, 2270, .0012],
      ["tone", .45, 1.16, .54, 670, 78, .018, .66],
      ["grains", "glass", .49, 1.09, .64, 1770, 17],
    ]);
  },
} satisfies SoundRecipe;
