import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "pneumatic-arcade-dart-tool-airy-pop",
  name: "Pneumatic arcade dart tool airy pop",
  category: "Weapons",
  tags: ["pneumatic", "arcade", "dart", "tool", "airy", "pop", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 0.54,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "air", 0, .064, .71, 2050, .0005],
      ["tone", 0, .083, .16, 540, 234, .0008, .29],
      ["brush", "air", .01, .40, .54, 1950, .006],
      ["contact", "wood", .021, .072, .25, 396, .0011],
    ]);
  },
} satisfies SoundRecipe;
