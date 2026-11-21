import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/glass-wall-collapse.ts';
import source2 from './_recordings/rake-leaf-pile.ts';

export default {
  id: "glass-pieces-swept-with-stiff-bristles",
  name: "Glass Pieces Swept with Stiff Bristles",
  category: "Impacts",
  tags: ["glass", "pieces", "swept", "stiff", "bristles"],
  loopable: false,
  durationSec: 1.14,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .41, .59, .139, 13500],
      ['clip', source2, .039, .57, .44, .13, 7300],
      ["grains", "glass", .19, .71, .35, 2720, 21],
      ['clip', source2, .53, .49, .47, .19, 8700],
    ]);
  },
} satisfies SoundRecipe;
