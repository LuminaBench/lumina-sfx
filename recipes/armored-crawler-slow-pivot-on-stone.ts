import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-track-slow.ts';
import source2 from './_recordings/motion-chain-scrape.ts';

export default {
  id: "armored-crawler-slow-pivot-on-stone",
  name: "Armored crawler slow pivot on stone",
  category: "Vehicles & Engines",
  tags: ["armored", "crawler", "slow", "pivot", "stone", "tank", "tracked", "armoured", "vehicle"],
  loopable: false,
  durationSec: 2.73,
  targetRmsDbfs: -24.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.69, .78, .22, 5110, .002, .19],
      ['clip', source2, .29, 2.27, .53, .03, 5800, .12, .26],
      ["brush", "stone", 0, 1.54, .57, 585, .006],
      ["motor", .33, 2.17, .23, 72, 109, .061, .68],
    ]);
  },
} satisfies SoundRecipe;
