import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-leaf-tear.ts';
import source2 from './_recordings/wet-crop-brush.ts';

export default {
  id: "peeling-a-wet-cabbage-leaf",
  name: "Peeling a Wet Cabbage Leaf",
  category: "Farming",
  tags: ["peeling", "wet", "cabbage", "leaf", "farm"],
  loopable: false,
  durationSec: 0.76,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .60, 1, 0, 12200],
      ['clip', source2, .20, .49, .27, .05, 7400],
    ]);
  },
} satisfies SoundRecipe;
