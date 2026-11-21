import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "scanner-focus-acquired",
  name: "Scanner Focus Acquired",
  category: "Sci-Fi & UI",
  tags: ["scanner", "focus", "acquired"],
  loopable: false,
  durationSec: 0.78,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, .37, .26, 1800, .025],
      ["tone", .004, .46, .46, 270, 730, .027, .38],
      ["contact", "rubber", .25, .19, .48, 664, .001],
      ["tone", .257, .32, .63, 843, 848, .009, .22],
    ]);
  },
} satisfies SoundRecipe;
