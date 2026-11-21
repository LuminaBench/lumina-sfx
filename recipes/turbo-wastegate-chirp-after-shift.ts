import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/motion-turbo-pass.ts';
import recording2 from './_recordings/demo-sports-gear.ts';

export default {
  id: 'turbo-wastegate-chirp-after-shift', name: 'Turbo wastegate chirp after shift', category: 'Vehicles & Engines',
  tags: ["vehicle", "turbo", "wastegate", "chirp", "after", "shift", "air", "foley"], loopable: false, durationSec: 0.92,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 0.86, 1.0, 0.31, 11200, 0.001, 0.09],
      ['clip', recording2, 0.09, 0.26, 0.4, 1.62, 5200, 0.006, 0.0494],
      ["brush", "air", 0.17, 0.28, 0.13, 1760, 0.016],
    ]);
  },
} satisfies SoundRecipe;
