import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "environmental-scrubber-startup",
  name: "Environmental Scrubber Startup",
  category: "Sci-Fi & UI",
  tags: ["environmental", "scrubber", "startup"],
  loopable: false,
  durationSec: 1.82,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, .14, .41, 735, .001],
      ["contact", "iron", .132, .19, .34, 571, .001],
      ["contact", "iron", .31, .19, .47, 458, .002],
      ["motor", .29, 1.39, .69, 85, 232, .71, .78],
      ["brush", "air", .43, 1.21, .59, 1040, .39],
    ]);
  },
} satisfies SoundRecipe;
