import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-bow.ts';
import source2 from './_recordings/demo-canopy-rustle.ts';

export default {
  id: "sailing-dinghy-across-the-bay-line-tension-change",
  name: "Sailing Dinghy across the Bay Line Tension Change",
  category: "Water & Fire",
  tags: ["sailing", "dinghy", "across", "bay", "line", "tension", "change"],
  loopable: false,
  durationSec: 2.27,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.1, 0.84, 0.09, 4350, 0.011, 0.16],
      ['clip', source2, 0.12, 1.8, 0.38, 0.11, 3480, 0.023, 0.16],
      ["contact", "water", 0.17, 0.35, 0.41, 380, 0.002],
    ]);
  },
} satisfies SoundRecipe;
