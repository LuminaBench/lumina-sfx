import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/car-tire-skid-launch.ts';
import recording2 from './_recordings/car-highway-pass.ts';

export default {
  id: 'dry-asphalt-tire-breaks-loose', name: 'Dry asphalt tire breaks loose', category: 'Vehicles & Engines',
  tags: ["vehicle", "dry", "asphalt", "tire", "breaks", "loose", "rubber", "foley"], loopable: false, durationSec: 0.75,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 0.69, 1.0, 0.25, 10800, 0.001, 0.09],
      ['clip', recording2, 0.1, 0.56, 0.16, 2.45, 2500, 0.006, 0.09],
      ["contact", "rubber", 0.03, 0.33, 0.13, 1200, 0.003],
    ]);
  },
} satisfies SoundRecipe;
