import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-bow.ts';
import source2 from './_recordings/slatted-crate-settle.ts';

export default {
  id: "wooden-dinghy-at-a-dock-moving-away",
  name: "Wooden Dinghy at a Dock Moving Away",
  category: "Water & Fire",
  tags: ["wooden", "dinghy", "dock", "moving", "away"],
  loopable: false,
  durationSec: 5.2,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.19, 0.86, 0.34, 1708, 0.022, 0.76],
      ["brush", "water", 0.34, 4.21, 0.3, 388, 0.19],
      ['clip', source2, 0.12, 4.75, 0.23, 0.28, 1372, 0.098, 0.77],
    ]);
  },
} satisfies SoundRecipe;
