import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-smallwater.ts';

export default {
  id: "electric-hydrofoil-rises-on-lift",
  name: "Electric hydrofoil rises on lift",
  category: "Water & Fire",
  tags: ["electric", "hydrofoil", "rises", "lift", "boat", "marine"],
  loopable: false,
  durationSec: 3.6,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.86, .59, .28, 5200, .003, .82],
      ["motor", 0, 3.43, .24, 92, 495, .031, .33],
      ["tone", .31, 3.1, .07, 196, 1036, .13, .24],
      ["brush", "air", .62, 2.94, .22, 2010, .15],
      ["contact", "water", 0, .11, .13, 411, .003],
    ]);
  },
} satisfies SoundRecipe;
