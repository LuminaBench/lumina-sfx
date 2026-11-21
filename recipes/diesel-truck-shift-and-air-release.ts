import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/response-truck-exterior.ts';
import recording2 from './_recordings/truck-air-brake-release.ts';

export default {
  id: 'diesel-truck-shift-and-air-release', name: 'Diesel truck shift and air release', category: 'Vehicles & Engines',
  tags: ["vehicle", "diesel", "truck", "shift", "and", "air", "release", "iron", "foley"], loopable: false, durationSec: 0.9,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 0.84, 0.77, 1.18, 5900, 0.001, 0.09],
      ['clip', recording2, 0.19, 0.53, 0.74, 0.05, 9800, 0.006, 0.09],
      ["contact", "iron", 0.11, 0.085, 0.17, 344, 0.003],
    ]);
  },
} satisfies SoundRecipe;
