import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/car-door-shut-inside.ts';
import recording2 from './_recordings/steel-drawer-open.ts';

export default {
  id: 'door-shuts-hard-on-hollow-van-body', name: 'Door shuts hard on hollow van body', category: 'Vehicles & Engines',
  tags: ["vehicle", "door", "shuts", "hard", "on", "hollow", "van", "body", "iron", "foley"], loopable: false, durationSec: 0.55,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 0.49, 1.0, 0.012, 7800, 0.001, 0.09],
      ['clip', recording2, 0.04, 0.28, 0.3, 0.09, 2100, 0.006, 0.053200000000000004],
      ["contact", "iron", 0.038, 0.16, 0.24, 151, 0.003],
    ]);
  },
} satisfies SoundRecipe;
