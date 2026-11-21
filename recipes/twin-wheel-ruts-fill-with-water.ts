import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/car-wet-asphalt-pass.ts';
import recording2 from './_recordings/heavy-puddle-stomp.ts';

export default {
  id: 'twin-wheel-ruts-fill-with-water', name: 'Twin wheel ruts fill with water', category: 'Vehicles & Engines',
  tags: ["vehicle", "twin", "wheel", "ruts", "fill", "with", "water", "foley"], loopable: false, durationSec: 1.17,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 1.11, 0.95, 0.75, 8800, 0.001, 0.09],
      ['clip', recording2, 0.13, 0.6, 0.47, 0.07, 6800, 0.006, 0.09],
      ["grains", "water", 0.57, 0.42, 0.21, 1030, 10],
    ]);
  },
} satisfies SoundRecipe;
