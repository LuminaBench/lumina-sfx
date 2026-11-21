import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/wet-crop-brush.ts';
import source2 from './_recordings/leather-strap-flex.ts';
import source3 from './_recordings/dry-branch-snap.ts';

export default {
  id: "staking-a-tomato-plant-with-twine",
  name: "Staking a Tomato Plant with Twine",
  category: "Farming",
  tags: ["staking", "tomato", "plant", "twine", "farm", "wakefall"],
  loopable: false,
  durationSec: 0.89,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .60, .58, .011, 6700],
      ['clip', source2, .14, .51, .55, .084, 5900],
      ['clip', source3, .52, .20, .43, .002, 8900],
    ]);
  },
} satisfies SoundRecipe;
