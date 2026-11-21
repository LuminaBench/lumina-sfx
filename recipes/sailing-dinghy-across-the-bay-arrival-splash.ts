import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-snapwater.ts';
import source2 from './_recordings/milestone-bow.ts';

export default {
  id: "sailing-dinghy-across-the-bay-arrival-splash",
  name: "Sailing Dinghy across the Bay Arrival Splash",
  category: "Water & Fire",
  tags: ["sailing", "dinghy", "across", "bay", "arrival", "splash"],
  loopable: false,
  durationSec: 2.02,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.81, 0.73, 0.083, 5220, 0.014, 0.18],
      ["contact", "water", 0.17, 0.27, 0.41, 304, 0.002],
      ['clip', source2, 0.38, 1.43, 0.28, 0.22, 4350, 0.018, 0.23],
    ]);
  },
} satisfies SoundRecipe;
