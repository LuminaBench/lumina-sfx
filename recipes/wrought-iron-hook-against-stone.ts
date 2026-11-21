import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/blacksmith-anvil-strike.ts';
import source2 from './_recordings/rock-pile-impact.ts';

export default {
  id: "wrought-iron-hook-against-stone",
  name: "Wrought-Iron Hook against Stone",
  category: "Impacts",
  tags: ["wrought", "iron", "hook", "against", "stone"],
  loopable: false,
  durationSec: 0.61,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .25, .78, .024, 12500],
      ['clip', source2, .026, .42, .54, .05, 7300],
      ["contact", "iron", .061, .31, .27, 490, .0008],
    ]);
  },
} satisfies SoundRecipe;
