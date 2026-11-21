import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/action-lever-cycle.ts';
import source2 from './_recordings/chain-rattle-short.ts';

export default {
  id: "folding-ladder-hinge-stop",
  name: "Folding Ladder Hinge Stop",
  category: "Impacts",
  tags: ["folding", "ladder", "hinge", "stop"],
  loopable: false,
  durationSec: 0.79,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .57, .63, .032, 9700],
      ['clip', source2, .26, .44, .38, .083, 10800],
      ["contact", "iron", .38, .25, .52, 410, .001],
    ]);
  },
} satisfies SoundRecipe;
