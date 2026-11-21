import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-flag-rush.ts';
import source2 from './_recordings/demo-canopy-rustle.ts';

export default {
  id: "loose-canopy-in-a-gust",
  name: "Loose Canopy in a Gust",
  category: "Weather & Ambience",
  tags: ["loose", "canopy", "gust", "ambience"],
  loopable: false,
  durationSec: 2.68,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.56, .95, .08, 9700],
      ['clip', source2, .37, 2.19, .31, .65, 6500, .24, .3],
    ]);
  },
} satisfies SoundRecipe;
