import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/shovel-dry-earth.ts';
import source2 from './_recordings/leather-strap-flex.ts';
import source3 from './_recordings/field-garden-release.ts';

export default {
  id: "pulling-a-garden-cane",
  name: "Pulling a Garden Cane",
  category: "Farming",
  tags: ["pulling", "garden", "cane", "farm"],
  loopable: false,
  durationSec: 0.8,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .61, .49, .03, 6700],
      ['clip', source2, .07, .31, .39, .02, 5000],
      ['clip', source3, .255, .44, .65, .068, 7400],
    ]);
  },
} satisfies SoundRecipe;
