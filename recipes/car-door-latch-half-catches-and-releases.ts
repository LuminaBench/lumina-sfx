import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/car-door-open.ts';
import recording2 from './_recordings/car-door-shut-inside.ts';

export default {
  id: 'car-door-latch-half-catches-and-releases', name: 'Car door latch half catches and releases', category: 'Vehicles & Engines',
  tags: ["vehicle", "car", "door", "latch", "half", "catches", "and", "releases", "iron", "foley"], loopable: false, durationSec: 0.51,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 0.32, 0.73, 0.023, 8300, 0.001, 0.0608],
      ['clip', recording2, 0.2, 0.25, 0.72, 0.012, 6300, 0.006, 0.0475],
      ["contact", "iron", 0.225, 0.037, 0.15, 1010, 0.003],
    ]);
  },
} satisfies SoundRecipe;
