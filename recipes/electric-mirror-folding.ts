import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/car-power-window-down.ts';

export default {
  id: "electric-mirror-folding",
  name: "Electric Mirror Folding",
  category: "Vehicles & Engines",
  tags: ["electric", "mirror", "folding", "vehicle"],
  loopable: false,
  durationSec: 1.37,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["motor", 0, 1.11, .67, 336, 274, .09, .47],
      ['clip', source, .063, .98, .25, .04, 6250],
      ["contact", "rubber", .78, .3, .37, 301, .003],
    ]);
  },
} satisfies SoundRecipe;
