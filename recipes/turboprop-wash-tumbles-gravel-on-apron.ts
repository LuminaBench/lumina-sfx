import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/milestone-prop-pass.ts';
import recording2 from './_recordings/loose-gravel-landing.ts';

export default {
  id: 'turboprop-wash-tumbles-gravel-on-apron', name: 'Turboprop wash tumbles gravel on apron', category: 'Aircraft',
  tags: ["aircraft", "turboprop", "wash", "tumbles", "gravel", "on", "apron", "stone", "foley"], loopable: false, durationSec: 2.37,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 2.31, 0.94, 2.42, 7950, 0.001, 0.09],
      ['clip', recording2, 0.33, 0.38, 0.44, 0.02, 7300, 0.006, 0.0722],
      ["grains", "stone", 0.72, 1.1, 0.27, 900, 18],
    ]);
  },
} satisfies SoundRecipe;
