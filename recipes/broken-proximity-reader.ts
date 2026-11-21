import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "broken-proximity-reader",
  name: "Broken Proximity Reader",
  category: "Sci-Fi & UI",
  tags: ["broken", "proximity", "reader"],
  loopable: false,
  durationSec: 0.97,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "rubber", 0, .13, .32, 450, .001],
      ["tone", .044, .18, .51, 555, 476, .006, .33],
      ["tone", .26, .167, .45, 524, 440, .007, .41],
      ["tone", .51, .37, .50, 473, 240, .005, .92],
      ["contact", "iron", .54, .17, .34, 530, .002],
    ]);
  },
} satisfies SoundRecipe;
