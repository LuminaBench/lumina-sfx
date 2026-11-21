import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/car-door-shut-inside.ts';
import recording2 from './_recordings/motion-chain-link.ts';

export default {
  id: 'loose-tailgate-slams-after-curb-drop', name: 'Loose tailgate slams after curb drop', category: 'Vehicles & Engines',
  tags: ["vehicle", "loose", "tailgate", "slams", "after", "curb", "drop", "iron", "foley"], loopable: false, durationSec: 0.73,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 0.45, 0.91, 0.01, 7400, 0.001, 0.0855],
      ['clip', recording2, 0.12, 0.55, 0.5, 0.41, 7800, 0.006, 0.09],
      ["contact", "iron", 0.21, 0.23, 0.22, 375, 0.003],
    ]);
  },
} satisfies SoundRecipe;
