import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/demo-rotor-bed.ts';
import recording2 from './_recordings/field-leaf-bed.ts';

export default {
  id: 'rotor-wash-strikes-grass-beside-pad', name: 'Rotor wash strikes grass beside pad', category: 'Aircraft',
  tags: ["aircraft", "rotor", "wash", "strikes", "grass", "beside", "pad", "plant", "foley"], loopable: false, durationSec: 2.44,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 2.38, 1.0, 2.52, 8200, 0.001, 0.09],
      ['clip', recording2, 0.19, 1.72, 0.63, 0.06, 7300, 0.006, 0.09],
      ["grains", "plant", 0.54, 1.1, 0.2, 790, 18],
    ]);
  },
} satisfies SoundRecipe;
