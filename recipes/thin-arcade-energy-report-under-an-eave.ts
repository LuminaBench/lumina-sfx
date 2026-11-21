import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "thin-arcade-energy-report-under-an-eave",
  name: "Thin Arcade Energy Report under an Eave",
  category: "Impacts",
  tags: ["thin", "arcade", "energy", "report", "under", "an", "eave"],
  loopable: false,
  durationSec: 0.94,
  targetRmsDbfs: -22,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "rubber", 0, .17, .79, 483, .001],
      ["brush", "air", 0, .32, .82, 2990, .001],
      ["tone", .003, .46, .56, 1221, 387, .019, .91],
      ["contact", "wood", .081, .24, .35, 561, .001],
      ["grains", "stone", .26, .48, .20, 1830, 10],
    ]);
  },
} satisfies SoundRecipe;
