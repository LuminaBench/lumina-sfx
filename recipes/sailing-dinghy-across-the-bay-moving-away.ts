import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-ocean.ts';
import source2 from './_recordings/demo-canopy-rustle.ts';

export default {
  id: "sailing-dinghy-across-the-bay-moving-away",
  name: "Sailing Dinghy across the Bay Moving Away",
  category: "Water & Fire",
  tags: ["sailing", "dinghy", "across", "bay", "moving", "away"],
  loopable: false,
  durationSec: 5.2,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.19, 0.86, 0.34, 2653.5, 0.022, 0.76],
      ["brush", "water", 0.34, 4.21, 0.3, 380, 0.19],
      ['clip', source2, 0.12, 4.75, 0.23, 0.28, 2131.5, 0.098, 0.77],
    ]);
  },
} satisfies SoundRecipe;
