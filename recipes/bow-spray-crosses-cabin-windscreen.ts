import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/milestone-snapwater.ts';
import recording2 from './_recordings/car-wiper-rain-loop.ts';

export default {
  id: 'bow-spray-crosses-cabin-windscreen', name: 'Bow spray crosses cabin windscreen', category: 'Vehicles & Engines',
  tags: ["vehicle", "bow", "spray", "crosses", "cabin", "windscreen", "water", "foley"], loopable: false, durationSec: 1.43,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 1.18, 0.89, 0.25, 6500, 0.001, 0.09],
      ['clip', recording2, 0.23, 1.14, 0.47, 0.5, 4100, 0.006, 0.09],
      ["grains", "water", 0.57, 0.65, 0.24, 1140, 13],
    ]);
  },
} satisfies SoundRecipe;
