import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-snapwater.ts';
import source2 from './_recordings/milestone-oar.ts';

export default {
  id: "rowboat-at-reed-bank-arrival-splash",
  name: "Rowboat at Reed Bank Arrival Splash",
  category: "Water & Fire",
  tags: ["rowboat", "reed", "bank", "arrival", "splash"],
  loopable: false,
  durationSec: 2.02,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.81, 0.73, 0.083, 3840, 0.014, 0.18],
      ["contact", "water", 0.17, 0.27, 0.41, 368, 0.002],
      ['clip', source2, 0.38, 1.43, 0.28, 0.22, 3200, 0.018, 0.23],
    ]);
  },
} satisfies SoundRecipe;
