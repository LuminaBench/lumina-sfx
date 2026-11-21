import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/car-dirt-road-pass.ts';
import recording2 from './_recordings/rock-pile-impact.ts';

export default {
  id: 'driven-tire-digs-in-loose-shoulder', name: 'Driven tire digs in loose shoulder', category: 'Vehicles & Engines',
  tags: ["vehicle", "driven", "tire", "digs", "in", "loose", "shoulder", "stone", "foley"], loopable: false, durationSec: 1.06,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 0.93, 0.87, 1.77, 7600, 0.001, 0.09],
      ['clip', recording2, 0.29, 0.49, 0.38, 0.11, 4600, 0.006, 0.09],
      ["grains", "stone", 0.13, 0.87, 0.4, 930, 15],
    ]);
  },
} satisfies SoundRecipe;
