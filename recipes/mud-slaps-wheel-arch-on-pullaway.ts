import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/mud-squelch-footstep.ts';
import recording2 from './_recordings/car-dirt-road-pass.ts';

export default {
  id: 'mud-slaps-wheel-arch-on-pullaway', name: 'Mud slaps wheel arch on pullaway', category: 'Vehicles & Engines',
  tags: ["vehicle", "mud", "slaps", "wheel", "arch", "on", "pullaway", "soil", "foley"], loopable: false, durationSec: 1.15,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 0.37, 0.91, 0.01, 6800, 0.001, 0.0703],
      ['clip', recording2, 0.06, 1.03, 0.41, 1.83, 2900, 0.006, 0.09],
      ["brush", "soil", 0.28, 0.54, 0.29, 530, 0.016],
    ]);
  },
} satisfies SoundRecipe;
