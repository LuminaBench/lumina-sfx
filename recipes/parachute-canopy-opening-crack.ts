import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-flag-rush.ts';
import source2 from './_recordings/demo-canopy-rustle.ts';

export default {
  id: "parachute-canopy-opening-crack",
  name: "Parachute Canopy Opening Crack",
  category: "Weather & Ambience",
  tags: ["parachute", "canopy", "opening", "crack", "ambience"],
  loopable: false,
  durationSec: 2.8,
  targetRmsDbfs: -21,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.89, .89, .225, 10900, .005, .26],
      ["contact", "cloth", .04, .23, .70, 560, .002],
      ['clip', source2, .56, 2.16, .49, 1.1, 6900, .09, .55],
      ["brush", "air", .22, 1.19, .23, 520, .08],
    ]);
  },
} satisfies SoundRecipe;
