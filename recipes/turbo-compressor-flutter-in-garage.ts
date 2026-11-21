import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/motion-turbo-pass.ts';
import recording2 from './_recordings/car-cabin-idle-loop.ts';

export default {
  id: 'turbo-compressor-flutter-in-garage', name: 'Turbo compressor flutter in garage', category: 'Vehicles & Engines',
  tags: ["vehicle", "turbo", "compressor", "flutter", "in", "garage", "air", "foley"], loopable: false, durationSec: 1.18,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 1.12, 0.91, 0.17, 11500, 0.001, 0.09],
      ['clip', recording2, 0.02, 0.98, 0.22, 0.98, 1700, 0.006, 0.09],
      ["brush", "air", 0.26, 0.51, 0.2, 1410, 0.016],
    ]);
  },
} satisfies SoundRecipe;
