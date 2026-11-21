import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/milestone-snapwater.ts';
import recording2 from './_recordings/motion-cessna-taxi.ts';

export default {
  id: 'floatplane-floats-slap-through-short-waves', name: 'Floatplane floats slap through short waves', category: 'Aircraft',
  tags: ["aircraft", "floatplane", "floats", "slap", "through", "short", "waves", "water", "foley"], loopable: false, durationSec: 1.8,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 1.22, 0.89, 0.07, 9300, 0.001, 0.09],
      ['clip', recording2, 0.02, 1.72, 0.58, 2.05, 3900, 0.006, 0.09],
      ["grains", "water", 0.53, 0.69, 0.22, 760, 13],
    ]);
  },
} satisfies SoundRecipe;
