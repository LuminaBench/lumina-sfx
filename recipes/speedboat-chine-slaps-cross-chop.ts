import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/milestone-smallwater.ts';
import recording2 from './_recordings/motion-flatboat-throttle.ts';

export default {
  id: 'speedboat-chine-slaps-cross-chop', name: 'Speedboat chine slaps cross chop', category: 'Vehicles & Engines',
  tags: ["vehicle", "speedboat", "chine", "slaps", "cross", "chop", "water", "foley"], loopable: false, durationSec: 0.98,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 0.79, 0.88, 0.03, 7900, 0.001, 0.09],
      ['clip', recording2, 0.032, 0.89, 0.28, 1.18, 2900, 0.006, 0.09],
      ["grains", "water", 0.38, 0.33, 0.25, 760, 9],
    ]);
  },
} satisfies SoundRecipe;
