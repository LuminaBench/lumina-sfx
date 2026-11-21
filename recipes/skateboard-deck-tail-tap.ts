import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/hardwood-footstep.ts';

export default {
  id: "skateboard-deck-tail-tap",
  name: "Skateboard Deck Tail Tap",
  category: "Impacts",
  tags: ["skateboard", "deck", "tail", "tap"],
  loopable: false,
  durationSec: 0.72,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.65, 0.76, 0.03, 9000, 0.007, 0.08],
      ["contact", "wood", 0.014, 0.24, 0.57, 316, 0.002],
      ["grains", "wood", 0.064, 0.47, 0.15, 581.44, 9],
    ]);
  },
} satisfies SoundRecipe;
