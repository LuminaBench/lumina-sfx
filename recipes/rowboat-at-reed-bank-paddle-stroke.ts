import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-oar.ts';

export default {
  id: "rowboat-at-reed-bank-paddle-stroke",
  name: "Rowboat at Reed Bank Paddle Stroke",
  category: "Water & Fire",
  tags: ["rowboat", "reed", "bank", "paddle", "stroke"],
  loopable: false,
  durationSec: 2.27,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.1, 0.84, 0.09, 3200, 0.011, 0.16],
      ['clip', source, 0.12, 1.8, 0.38, 0.11, 2560, 0.023, 0.16],
      ["contact", "water", 0.17, 0.35, 0.41, 460, 0.002],
    ]);
  },
} satisfies SoundRecipe;
