import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/hardwood-footstep.ts';

export default {
  id: "skateboard-deck-board-rocks-back",
  name: "Skateboard Deck Board Rocks Back",
  category: "Impacts",
  tags: ["skateboard", "deck", "board", "rocks", "back"],
  loopable: false,
  durationSec: 1.21,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.46, 0.61, 0.04, 9000, 0.007, 0.08],
      ["contact", "wood", 0.035, 0.23, 0.54, 262.28, 0.002],
      ['clip', source, 0.37, 0.76, 0.52, 0.19, 7020, 0.007, 0.08],
      ["contact", "wood", 0.56, 0.27, 0.34, 363.4, 0.002],
      ["grains", "wood", 0.61, 0.5, 0.19, 632, 12],
    ]);
  },
} satisfies SoundRecipe;
