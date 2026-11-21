import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "interface-loading-three-soft-pulses",
  name: "Interface Loading Three Soft Pulses",
  category: "Sci-Fi & UI",
  tags: ["interface", "loading", "three", "soft", "pulses"],
  loopable: false,
  durationSec: 1.63,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["tone", 0, .38, .53, 538, 565, .03, .42],
      ["tone", .49, .40, .48, 614, 634, .04, .36],
      ["tone", 1.0, .55, .47, 710, 720, .041, .39],
    ]);
  },
} satisfies SoundRecipe;
