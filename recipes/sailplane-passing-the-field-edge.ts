import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-canopy-rustle.ts';

export default {
  id: "sailplane-passing-the-field-edge",
  name: "Sailplane Passing the Field Edge",
  category: "Aircraft",
  tags: ["sailplane", "passing", "field", "edge"],
  loopable: false,
  durationSec: 4.7,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 4.2, 0.74, 0.03, 6300, 0.055, 0.65],
      ["brush", "air", 0.1, 4.42, 0.57, 1230, 0.7],
    ]);
  },
} satisfies SoundRecipe;
