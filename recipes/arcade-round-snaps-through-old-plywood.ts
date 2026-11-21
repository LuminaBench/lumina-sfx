import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-tool.ts';

export default {
  id: "arcade-round-snaps-through-old-plywood",
  name: "Arcade round snaps through old plywood",
  category: "Weapons",
  tags: ["arcade", "round", "snaps", "old", "plywood"],
  loopable: false,
  durationSec: 0.63,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "wood", 0, .115, .91, 445, .0008],
      ["contact", "iron", 0, .063, .32, 1520, .0007],
      ["grains", "wood", .024, .48, .74, 820, 10],
      ['clip', source, .021, .30, .31, .034, 4300, .003, .06],
    ]);
  },
} satisfies SoundRecipe;
