import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-clank-close.ts';

export default {
  id: "hard-shell-energy-cell-cracks-loose",
  name: "Hard-shell energy cell cracks loose",
  category: "Weapons",
  tags: ["hard", "shell", "energy", "cell", "cracks", "loose"],
  loopable: false,
  durationSec: 0.66,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .30, .42, .017, 7300, .003, .049],
      ["contact", "rubber", 0, .079, .64, 434, .0009],
      ["brush", "iron", .064, .30, .29, 490, .007],
      ["contact", "iron", .214, .18, .55, 1270, .0007],
      ["tone", .315, .14, .065, 994, 872, .003, .19],
    ]);
  },
} satisfies SoundRecipe;
