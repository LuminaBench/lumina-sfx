import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/car-bumper-bump.ts';
import recording2 from './_recordings/car-crash-metal-glass.ts';

export default {
  id: 'side-glass-breaks-during-parking-collision', name: 'Side glass breaks during parking collision', category: 'Vehicles & Engines',
  tags: ["vehicle", "side", "glass", "breaks", "during", "parking", "collision", "foley"], loopable: false, durationSec: 1.37,
  mixRole: 'vehicle', targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 0.17, 0.91, 0.007, 8300, 0.001, 0.0323],
      ['clip', recording2, 0.06, 1.25, 0.89, 0.12, 10500, 0.006, 0.09],
      ["grains", "glass", 0.35, 0.84, 0.27, 1760, 15],
    ]);
  },
} satisfies SoundRecipe;
