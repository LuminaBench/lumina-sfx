import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/reviewed-motion-sailboat-cabin.ts';
import recording2 from './_recordings/milestone-snapwater.ts';

export default {
  id: 'wake-rattles-an-aluminum-skiff-floor', name: 'Wake rattles an aluminum skiff floor', category: 'Vehicles & Engines',
  tags: ["vehicle", "wake", "rattles", "an", "aluminum", "skiff", "floor", "iron", "foley"], loopable: false, durationSec: 1.23,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 1.17, 0.85, 1.64, 3700, 0.001, 0.09],
      ['clip', recording2, 0.04, 0.89, 0.54, 0.11, 4200, 0.006, 0.09],
      ["contact", "iron", 0.19, 0.39, 0.31, 250, 0.003],
    ]);
  },
} satisfies SoundRecipe;
