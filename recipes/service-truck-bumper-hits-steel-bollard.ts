import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/car-bumper-bump.ts';
import recording2 from './_recordings/motion-clank-close.ts';

export default {
  id: 'service-truck-bumper-hits-steel-bollard', name: 'Service truck bumper hits steel bollard', category: 'Vehicles & Engines',
  tags: ["vehicle", "service", "truck", "bumper", "hits", "steel", "bollard", "iron", "foley"], loopable: false, durationSec: 0.45,
  mixRole: 'vehicle', targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 0.19, 0.97, 0.003, 7600, 0.001, 0.0361],
      ['clip', recording2, 0.033, 0.22, 0.77, 0.02, 3600, 0.006, 0.041800000000000004],
      ["contact", "iron", 0.08, 0.31, 0.29, 170, 0.003],
    ]);
  },
} satisfies SoundRecipe;
