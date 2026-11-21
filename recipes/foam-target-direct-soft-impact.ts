import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "foam-target-direct-soft-impact",
  name: "Foam Target Direct Soft Impact",
  category: "Impacts",
  tags: ["foam", "target", "direct", "soft", "impact"],
  loopable: false,
  durationSec: 0.72,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.65, 0.76, 0.03, 3800, 0.007, 0.08],
      ["contact", "cloth", 0.014, 0.24, 0.57, 239, 0.002],
      ["grains", "cloth", 0.064, 0.47, 0.15, 439.76, 9],
    ]);
  },
} satisfies SoundRecipe;
