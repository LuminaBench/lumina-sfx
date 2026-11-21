import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-track-roll.ts';
import source2 from './_recordings/motion-chain-link.ts';

export default {
  id: "armored-crawler-metal-deck-loop",
  name: "Armored crawler metal deck loop",
  category: "Vehicles & Engines",
  tags: ["armored", "crawler", "deck", "tank", "tracked", "armoured", "vehicle"],
  loopable: true,
  durationSec: 4.95,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.07, .52, .89, 7700, 0, 0],
      ['clip', source2, .12, 2.04, .27, .02, 9200, .1, .13],
      ['clip', source2, 2.60, 2.14, .29, .025, 8450, .10, .08],
      ["grains", "iron", .09, 4.65, .41, 595, 31],
    ]);
  },
} satisfies SoundRecipe;
