import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/car-dirt-road-pass.ts';
import recording2 from './_recordings/car-tire-skid-launch.ts';

export default {
  id: 'rear-wheels-cross-gravel-onto-tarmac', name: 'Rear wheels cross gravel onto tarmac', category: 'Vehicles & Engines',
  tags: ["vehicle", "rear", "wheels", "cross", "gravel", "onto", "tarmac", "stone", "foley"], loopable: false, durationSec: 0.88,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 0.62, 0.84, 1.24, 7300, 0.001, 0.09],
      ['clip', recording2, 0.43, 0.39, 0.63, 0.44, 10500, 0.006, 0.0741],
      ["grains", "stone", 0.36, 0.34, 0.22, 810, 9],
    ]);
  },
} satisfies SoundRecipe;
