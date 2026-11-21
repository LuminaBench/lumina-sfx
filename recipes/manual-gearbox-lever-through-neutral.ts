import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/demo-sports-gear.ts';
import recording2 from './_recordings/motion-clank-close.ts';

export default {
  id: 'manual-gearbox-lever-through-neutral', name: 'Manual gearbox lever through neutral', category: 'Vehicles & Engines',
  tags: ["vehicle", "manual", "gearbox", "lever", "through", "neutral", "iron", "foley"], loopable: false, durationSec: 0.59,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 0.53, 0.81, 1.21, 7700, 0.001, 0.09],
      ['clip', recording2, 0.245, 0.12, 0.67, 0.018, 5300, 0.006, 0.0228],
      ["contact", "iron", 0.027, 0.076, 0.21, 480, 0.003],
    ]);
  },
} satisfies SoundRecipe;
