import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/bundle-dry-stalks.ts';
import source2 from './_recordings/field-garden-release.ts';
import source3 from './_recordings/field-leaf-tear.ts';

export default {
  id: "picking-strawberries-through-mulch",
  name: "Picking Strawberries through Mulch",
  category: "Farming",
  tags: ["picking", "strawberries", "mulch", "farm"],
  loopable: false,
  durationSec: 0.75,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .49, .56, .072, 6900],
      ['clip', source2, .16, .37, .37, .035, 8800],
      ['clip', source3, .28, .36, .33, .063, 6300],
    ]);
  },
} satisfies SoundRecipe;
