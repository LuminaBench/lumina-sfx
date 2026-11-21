import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sheltered-wind.ts';

export default {
  id: "gust-under-a-balcony",
  name: "Gust under a Balcony",
  category: "Weather & Ambience",
  tags: ["gust", "under", "balcony", "ambience"],
  loopable: false,
  durationSec: 3.77,
  targetRmsDbfs: -30,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, 3.60, .72, 505, .43],
      ['clip', source, .33, 3.35, .26, 9.20, 2350, .44, .74],
    ]);
  },
} satisfies SoundRecipe;
