import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "data-visualization-rising-accent",
  name: "Data Visualization Rising Accent",
  category: "Sci-Fi & UI",
  tags: ["data", "visualization", "rising", "accent"],
  loopable: false,
  durationSec: 1.08,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["tone", 0, .26, .47, 432, 474, .013, .51],
      ["tone", .19, .30, .47, 655, 673, .013, .37],
      ["tone", .41, .55, .52, 790, 805, .019, .39],
      ["brush", "air", .03, .77, .20, 1950, .12],
    ]);
  },
} satisfies SoundRecipe;
