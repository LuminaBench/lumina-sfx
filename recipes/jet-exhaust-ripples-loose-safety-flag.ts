import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/demo-fighter-rise.ts';
import recording2 from './_recordings/demo-flag-rush.ts';

export default {
  id: 'jet-exhaust-ripples-loose-safety-flag', name: 'Jet exhaust ripples loose safety flag', category: 'Aircraft',
  tags: ["aircraft", "jet", "exhaust", "ripples", "loose", "safety", "flag", "cloth", "foley"], loopable: false, durationSec: 2.27,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 2.21, 0.97, 3.13, 8000, 0.001, 0.09],
      ['clip', recording2, 0.11, 1.87, 0.59, 0.32, 9300, 0.006, 0.09],
      ["brush", "cloth", 0.49, 0.79, 0.2, 660, 0.016],
    ]);
  },
} satisfies SoundRecipe;
