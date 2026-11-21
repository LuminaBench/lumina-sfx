import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-prop-pass.ts';

export default {
  id: "coastal-floatplane-heard-from-inside-a-shelter",
  name: "Coastal Floatplane Heard from Inside a Shelter",
  category: "Aircraft",
  tags: ["coastal", "floatplane", "heard", "inside", "shelter"],
  loopable: false,
  durationSec: 5.86,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.49, 0.75, 0.15, 1056, 0.022, 0.73],
      ['clip', source, 0.068, 4.85, 0.15, 0.17, 550, 0.018, 0.82],
      ["brush", "air", 0.26, 3.95, 0.2, 280.8, 0.34],
    ]);
  },
} satisfies SoundRecipe;
