import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/motion-outboard-aeration.ts';
import recording2 from './_recordings/milestone-smallwater.ts';

export default {
  id: 'outboard-prop-ventilates-over-wave-crest', name: 'Outboard prop ventilates over wave crest', category: 'Vehicles & Engines',
  tags: ["vehicle", "outboard", "prop", "ventilates", "over", "wave", "crest", "water", "foley"], loopable: false, durationSec: 1.26,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 1.2, 0.9, 1.04, 7800, 0.001, 0.09],
      ['clip', recording2, 0.27, 0.76, 0.44, 0.12, 10000, 0.006, 0.09],
      ["grains", "water", 0.43, 0.64, 0.23, 1340, 13],
    ]);
  },
} satisfies SoundRecipe;
