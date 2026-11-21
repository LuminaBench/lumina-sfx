import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-clank-close.ts';

export default {
  id: "arcade-ricochet-on-hanging-steel-panel",
  name: "Arcade ricochet on hanging steel panel",
  category: "Weapons",
  tags: ["arcade", "ricochet", "hanging", "steel", "panel"],
  loopable: false,
  durationSec: 0.94,
  targetRmsDbfs: -25.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .30, .67, .015, 12400, .002, .047],
      ["contact", "iron", 0, .115, .65, 1980, .00058],
      ["contact", "iron", 0, .083, .96, 5440, .00052],
      ["contact", "glass", .020, .14, .53, 5100, .0012],
      ["tone", .009, .61, .18, 3310, 2710, .003, .42],
      ["grains", "iron", .081, .68, .34, 1570, 7],
    ]);
  },
} satisfies SoundRecipe;
