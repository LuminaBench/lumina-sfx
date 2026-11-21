import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/bundle-dry-stalks.ts';
import source2 from './_recordings/shovel-dry-earth.ts';
import source3 from './_recordings/field-hen-scratch.ts';

export default {
  id: "stall-straw-fork-toss",
  name: "Stall Straw Fork Toss",
  category: "Animals",
  tags: ["stall", "straw", "fork", "toss", "livestock"],
  loopable: false,
  durationSec: 1.24,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.05, .79, .05, 10000],
      ['clip', source2, .083, .56, .32, .10, 4900],
      ['clip', source3, .32, .73, .48, .41, 8200],
    ]);
  },
} satisfies SoundRecipe;
