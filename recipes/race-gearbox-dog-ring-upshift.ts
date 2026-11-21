import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/demo-sports-gear.ts';
import recording2 from './_recordings/motion-clank-close.ts';

export default {
  id: 'race-gearbox-dog-ring-upshift', name: 'Race gearbox dog ring upshift', category: 'Vehicles & Engines',
  tags: ["vehicle", "race", "gearbox", "dog", "ring", "upshift", "iron", "foley"], loopable: false, durationSec: 0.6,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 0.54, 0.93, 0.69, 9900, 0.001, 0.09],
      ['clip', recording2, 0.094, 0.082, 0.4, 0.014, 7200, 0.006, 0.01558],
      ["contact", "iron", 0.092, 0.064, 0.14, 970, 0.003],
    ]);
  },
} satisfies SoundRecipe;
